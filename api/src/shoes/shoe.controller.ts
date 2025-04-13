import { Request, Response } from "express";
import { ShoeService } from "./shoe.service";
import { NotFoundError } from "../errors/NotFoundError";

export class ShoeController {
    private shoeService: ShoeService;

    constructor() {
        this.shoeService = new ShoeService();
    }

    async getShoes(req: Request, res: Response) {
        try {
            const shoes = await this.shoeService.getShoes();
            res.status(200).json(shoes);
        } catch (error) {
            res.status(500).json({ error: error instanceof Error ? error.message : "Error al obtener zapatillas!" })
        }
    }

    async getShoe(req: Request, res: Response) {
        try {
            const shoe = await this.shoeService.getShoe(Number(req.params.id));
            res.status(200).json(shoe);
        } catch (error) {
            if (error instanceof NotFoundError) {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: error instanceof Error ? error.message : "Error al obtener zapatilla" });
            }
        }
    }

    async createShoe(req: Request, res: Response) {
        try {
            const shoeCreated = await this.shoeService.createShoe(req.body);
            res.status(201).json({
                message: "Zapatilla creada correctamente!",
                shoe: shoeCreated
            });
        } catch (error) {

            res.status(500).json({ error: error instanceof Error ? error.message : "Error al crear zapatilla" });

        }
    }

}