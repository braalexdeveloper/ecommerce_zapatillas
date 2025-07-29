import { Request, Response } from "express";
import { NotFoundError } from "../errors/NotFoundError";
import { OrderService } from "./order.service";


export class OrderController {
    private orderService: OrderService;

    constructor() {
        this.orderService = new OrderService();
    }

    async getOrders(req: Request, res: Response) {
        try {
            const orders = await this.orderService.getOrders();
            res.status(200).json(orders);
        } catch (error) {
            if (error instanceof NotFoundError) {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: error instanceof Error ? error.message : "Error al obtener ordenes" });
            }
        }
    }

    async createOrder(req: Request, res: Response) {
        try {
         const order=await this.orderService.createOrder(req.body);
         res.status(201).json({message:"Orden creado correctamente",order});
        } catch (error) {
            if (error instanceof NotFoundError) {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: error instanceof Error ? error.message : "Error al crear orden" });
            }
        }
    }
}