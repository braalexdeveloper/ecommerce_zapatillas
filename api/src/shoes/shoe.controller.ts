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
            const page=parseInt(req.query.page as string) || 1;
            const limit=parseInt(req.query.limit as string) || 10;
            const orderPrice = (req.query.orderPrice as string) || 'asc';
            const brandsIds=(req.query.brands as string)?.split(",").map(id=>Number(id));
            const categories=req.query.categories ? JSON.parse(req.query.categories as string) : null;
          console.log('categoriasss',categories)
            const shoes = await this.shoeService.getShoes({page,limit,orderPrice,brandsIds,categories});

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
            const files = req.files as Express.Multer.File[];
                        
            const shoeCreated = await this.shoeService.createShoe(req.body,files);
            res.status(201).json({
                message: "Zapatilla creada correctamente!",
                shoe: shoeCreated
            });
        } catch (error) {

            res.status(500).json({ error: error instanceof Error ? error.message : "Error al crear zapatilla" });

        }
    }

    async updateShoe(req: Request, res: Response) {
        try {
            const files = req.files as Express.Multer.File[];
                        
            const shoeUpdate = await this.shoeService.updateShoe(Number(req.params.id),req.body,files);
            res.status(201).json({
                message: "Zapatilla actualizada correctamente!",
                shoe: shoeUpdate
            });
        } catch (error) {

            res.status(500).json({ error: error instanceof Error ? error.message : "Error al actualizar zapatilla" });

        }
    }

    async deleteShoe(req: Request, res: Response){
        try {
            const message = await this.shoeService.deleteShoe(Number(req.params.id));
            res.status(200).json({message});
        } catch (error) {
            if (error instanceof NotFoundError) {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: error instanceof Error ? error.message : "Error al eliminar zapatilla" });
            }
        }
    }

}