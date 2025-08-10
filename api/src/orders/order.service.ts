import { Repository } from "typeorm";
import { AppDataSource } from "../config/database";
import { Order } from "./order.entity";
import { OrderCreateI } from "./interfaces/orderCreateI";
import { NotFoundError } from "../errors/NotFoundError";
import { Shoe } from "../shoes/shoe.entity";
import { OrderShoe } from "../relations/order-shoe.entity";
import { Client } from "../clients/client.entity";





export class OrderService {
    private orderRepository: Repository<Order>;
    private clientRepository: Repository<Client>;
    private shoeRepository: Repository<Shoe>;
    private orderShoeRepository: Repository<OrderShoe>;


    constructor() {
        this.orderRepository = AppDataSource.getRepository(Order);
        this.clientRepository = AppDataSource.getRepository(Client);
        this.shoeRepository = AppDataSource.getRepository(Shoe);
        this.orderShoeRepository = AppDataSource.getRepository(OrderShoe);

    }

    async getOrders() {
        return await this.orderRepository.find();
    }

    async getOrdersByClient(client_id: number) {
        return await this.orderRepository.find({
            where: { client: { id: client_id } },
            relations: ['client', 'order_shoes', 'order_shoes.shoe', 'order_shoes.shoe.images']
        });
    }

    async createOrder(order: OrderCreateI) {
        return await AppDataSource.transaction(async (manager) => {
            // Repositorios dentro de la transacción
            const orderRepo = manager.getRepository(Order);
            const clientRepo = manager.getRepository(Client);
            const shoeRepo = manager.getRepository(Shoe);
            const orderShoeRepo = manager.getRepository(OrderShoe);


            // Buscar cliente
            const clientFound = await clientRepo.findOne({ where: { id: order.client_id } });
            if (!clientFound) throw new NotFoundError("Cliente no encontrado");

            // Crear la orden
            const newOrder = {
                address: order.address,
                date_sale: new Date(),
                total: order.total,
                client: clientFound
            };

            const orderCreated = await orderRepo.save(newOrder);

            // Crear los items de la orden
            for (const el of order.order_shoes) {
                const shoeFound = await shoeRepo.findOne({ where: { id: el.shoe_id } });
                if (!shoeFound) throw new NotFoundError(`Zapatilla con ID ${el.shoe_id} no encontrada`);

                const item = orderShoeRepo.create({
                    quantity: el.quantity,
                    subtotal: el.subtotal,
                    shoe: shoeFound,
                    order: orderCreated
                });

                await orderShoeRepo.save(item);
            }

            return orderCreated;
        });
    }

    async createOrderWithUserAndClient(order: OrderCreateI) {
        return await AppDataSource.transaction(async (manager) => {
            // Repositorios dentro de la transacción
            const orderRepo = manager.getRepository(Order);
            const clientRepo = manager.getRepository(Client);
            const shoeRepo = manager.getRepository(Shoe);
            const orderShoeRepo = manager.getRepository(OrderShoe);


            // Buscar cliente
            const clientFound = await clientRepo.findOne({ where: { id: order.client_id } });
            if (!clientFound) throw new NotFoundError("Cliente no encontrado");

            // Crear la orden
            const newOrder = {
                address: order.address,
                date_sale: new Date(),
                total: order.total,
                client: clientFound
            };

            const orderCreated = await orderRepo.save(newOrder);

            // Crear los items de la orden
            for (const el of order.order_shoes) {
                const shoeFound = await shoeRepo.findOne({ where: { id: el.shoe_id } });
                if (!shoeFound) throw new NotFoundError(`Zapatilla con ID ${el.shoe_id} no encontrada`);

                const item = orderShoeRepo.create({
                    quantity: el.quantity,
                    subtotal: el.subtotal,
                    shoe: shoeFound,
                    order: orderCreated
                });

                await orderShoeRepo.save(item);
            }

            return orderCreated;
        });
    }
}