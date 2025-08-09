import { OrderCreateI } from "../orders/interfaces/orderCreateI";
import {MercadoPagoConfig,Preference} from "mercadopago";

const client=new MercadoPagoConfig({
    accessToken:'TEST-3040999168655523-072918-a093318c776ba0871edb0d64b4beb87e-159627013',//process.env.MERCADO_PAGO_ACCESS_TOKEN as string,
});

export class MercadoPagoService {
  async createPreference(order: OrderCreateI) {
    try {
      // Validación básica de los items
      if (!order.order_shoes || order.order_shoes.length === 0) {
        throw new Error("La orden debe contener al menos un producto");
      }

      const preferenceData = {
        items: order.order_shoes.map((el) => ({
          id: el.shoe_id.toString(),
          title: `Zapatilla ID ${el.shoe_id}`,
          description: `Descripción del producto ${el.shoe_id}`, // Campo recomendado
          quantity: Number(el.quantity),
          unit_price: Number((el.subtotal / el.quantity).toFixed(2)), // Asegurar 2 decimales
          currency_id: 'PEN',
          picture_url: 'https://ejemplo.com/imagen.jpg' // Opcional pero recomendado
        })),
        back_urls: {
          success: 'https://brayanweb.com/servicios/',
          failure: 'https://tu-frontend.com/failure',
          pending: 'https://tu-frontend.com/pending' // Recomendado añadir
        },
        auto_return: 'approved',
        notification_url: 'https://4e4956c5c2fa.ngrok-free.app/api/mercadopago/webhook',
        metadata: order,
        statement_descriptor: 'TIENDASNEAKER' // Nombre que aparecerá en el resumen de tarjeta
      };

      const preference = new Preference(client);
      const response = await preference.create({ body: preferenceData });
      
      if (!response.sandbox_init_point && !response.init_point) {
        throw new Error("No se pudo generar la URL de pago");
      }

      return {
        sandbox_url: response.sandbox_init_point,
        production_url: response.init_point
      };

    } catch (error) {
      console.error("Error al crear preferencia:", error);
      throw new Error(`Error MP: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}