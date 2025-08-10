
import { Request, Response } from "express";
import { OrderService } from "../orders/order.service";
import { MercadoPagoService } from "./mercadoPago.service";
import { MercadoPagoConfig, Payment } from 'mercadopago';
import { createHmac } from "crypto";

const client = new MercadoPagoConfig({
  accessToken:'TEST-3040999168655523-072918-a093318c776ba0871edb0d64b4beb87e-159627013',//process.env.MERCADO_PAGO_ACCESS_TOKEN as string,
});


const mercadoPagoService=new MercadoPagoService();
const orderService=new OrderService();

export const createPreference=async (req:Request,res:Response)=>{
try {
    const preferenceUrl=await mercadoPagoService.createPreference(req.body,req.user);
    res.status(200).json({url:preferenceUrl});
} catch (error) {
    res.status(500).json({msg:"Error al crear preferencia",error});
}
}

export const webhookHandler = async (req: Request, res: Response) => {
  try {
      // 1. Obtener la firma del header
    /*const signature = req.headers["x-signature"] as string;
    if (!signature) {
      res.status(401).json({ msg: "Firma no proporcionada" });
    }*/

    // 2. Validar la firma manualmente
    /*const isValid = validateMercadoPagoWebhook(
      signature,
      req.body,
      process.env.MERCADO_PAGO_ACCESS_TOKEN!
    );*/

   /* if (!isValid) {
      res.status(401).json({ msg: "Firma inválida" });
    }*/

    const paymentData = req.body;

    if (paymentData.action === 'payment.created' || paymentData.type === 'payment') {
      const paymentId = paymentData.data.id;
      const payment = new Payment(client);

      const mpPayment = await payment.get({ id: paymentId });
      
      if (mpPayment.status === 'approved') {
        const metadata = mpPayment.metadata;
        await orderService.createOrder(metadata);
        console.log(paymentData)
        res.status(200).json({ msg: "Orden creada exitosamente" }); // ✔️ Respuesta explícita
        return;
      }
    }

   res.status(200).json({ msg: "Webhook recibido pero no procesado" }); // ✔️
    return ;
    
  } catch (err) {
    console.error('Error en webhook:', err);
    res.status(500).json({ msg: 'Error en webhook', error: err }); // ✔️
    return 
  }
};

// Función para validar la firma del webhook
function validateMercadoPagoWebhook(
  signature: string,
  payload: any,
  accessToken: string
): boolean {
  const hash = createHmac("sha256", accessToken)
    .update(JSON.stringify(payload))
    .digest("hex");

  return signature === `sha256=${hash}`;
}

