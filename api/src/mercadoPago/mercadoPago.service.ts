import { Repository } from "typeorm";
import { MercadoPagoConfig, Preference } from "mercadopago";
import { User } from "../users/user.entity";
import { Client } from "../clients/client.entity";
import { AppDataSource } from "../config/database";
import { sendPasswordEmail } from "../utils/sendPasswordEmail";
import { NotFoundError } from "../errors/NotFoundError";
import { MercadoPagoI } from "./mercadoPagoI";

const clientMp = new MercadoPagoConfig({
  accessToken: 'TEST-3040999168655523-072918-a093318c776ba087e-159627013',
});

export class MercadoPagoService {
  private userRepository: Repository<User>;
  private clientRepository: Repository<Client>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
    this.clientRepository = AppDataSource.getRepository(Client);
  }

  // Crea usuario y cliente para usuario NO logueado
  private async createUserAndClient(order: MercadoPagoI) {
    if (!order.email) throw new Error("Email es obligatorio para usuarios no logueados");

    const existingUser = await this.userRepository.findOne({ where: { email: order.email } });
    if (existingUser) {
      throw new Error("El email ya existe, si ya has comprado anteriormente debes loguearte para comprar");
    }

    const generatedPassword = 'ABC123xyz' + order.email.split('@')[0].substring(0, 3).toLowerCase();
    sendPasswordEmail(order.email, generatedPassword);

    const newUser = await this.userRepository.save({ email: order.email, password: generatedPassword, role_id: 1 });

    const newClient = await this.clientRepository.save({
      name: order.name,
      lastName: order.lastName,
      dni: order.dni,
      phone: order.phone,
      user: newUser,
    });

    return newClient;
  }

  // Obtiene o crea cliente para usuario logueado
  private async getOrCreateClientForUser(order: MercadoPagoI, user: User) {
    let clientFound = await this.clientRepository.findOne({ where: { user: { id: user.id } } });

    if (!clientFound) {
      const userFound = await this.userRepository.findOne({ where: { id: user.id } });
      if (!userFound) throw new NotFoundError("Usuario no encontrado");

      clientFound = await this.clientRepository.save({
        name: order.name,
        lastName: order.lastName,
        dni: order.dni,
        phone: order.phone,
        user: userFound,
      });
    }

    return clientFound;
  }

  async createPreference(order: MercadoPagoI, user: User | null) {
    try {
      if (!order.order_shoes || order.order_shoes.length === 0) {
        throw new Error("La orden debe contener al menos un producto");
      }

      let client: Client;

      if (!user || !user.id) {
        // Usuario no logueado
        client = await this.createUserAndClient(order);
      } else {
        // Usuario logueado
        client = await this.getOrCreateClientForUser(order, user);
      }

      // Asignar client_id en la orden
      order.client_id = client.id;

      // Crear datos para la preferencia de pago
      const preferenceData = {
        items: order.order_shoes.map(el => ({
          id: el.shoe_id.toString(),
          title: `Zapatilla ID ${el.shoe_id}`,
          description: `Descripción del producto ${el.shoe_id}`,
          quantity: Number(el.quantity),
          unit_price: Number((el.subtotal / el.quantity).toFixed(2)),
          currency_id: 'PEN',
          picture_url: 'https://ejemplo.com/imagen.jpg',
        })),
        back_urls: {
          success: 'https://brayanweb.com/servicios/',
          failure: 'https://tu-frontend.com/failure',
          pending: 'https://tu-frontend.com/pending',
        },
        auto_return: 'approved',
        notification_url: 'https://4e4956c5c2fa.ngrok-free.app/api/mercadopago/webhook',
        metadata: order,
        statement_descriptor: 'TIENDASNEAKER',
      };

      const preference = new Preference(clientMp);
      const response = await preference.create({ body: preferenceData });

      if (!response.sandbox_init_point && !response.init_point) {
        throw new Error("No se pudo generar la URL de pago");
      }

      return {
        sandbox_url: response.sandbox_init_point,
        production_url: response.init_point,
      };

    } catch (error) {
      console.error("Error al crear preferencia:", error);
      throw new Error(`Error MP: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}
