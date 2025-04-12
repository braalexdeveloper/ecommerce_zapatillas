import { Request, Response } from "express";
import { BrandService } from "./brand.service";
import { NotFoundError } from "../errors/NotFoundError";

export class BrandController {
    private brandService: BrandService;

    constructor() {
        this.brandService = new BrandService();
    }

    async getBrands(req: Request, res: Response) {
        try {
            const brands = await this.brandService.getBrands();
            res.status(200).json(brands);
        } catch (error) {
            if (error instanceof NotFoundError) {
                res.status(404).json({ error: error.message })
            } else {
                res.status(500).json({ error: error instanceof Error ? error.message : "Error al obtener marcas" })
            }
        }
    }

    async getBrand(req: Request, res: Response) {
        try {
            const brand = await this.brandService.getBrand(Number(req.params.id));
            res.status(200).json(brand);
        } catch (error) {
            if (error instanceof NotFoundError) {
                res.status(404).json({ error: error.message })
            } else {
                res.status(500).json({ error: error instanceof Error ? error.message : "Error al obtener marcas" })
            }
        }
    }

    async createBrand(req:Request,res:Response){
        try {
            const brandCreated=await this.brandService.createBrand(req.body);
            res.status(201).json({msg:"Marca creada correctamente",brand:brandCreated});
        } catch (error) {
            res.status(500).json({ error: error instanceof Error ? error.message : "Error al crear marca" });
        }
    }

    async updateBrand(req:Request,res:Response){
        try {
            const brand = await this.brandService.updateBrand(Number(req.params.id),req.body);
            res.status(200).json({
                "message":"Marca actualizada correctamente!",
                brand
            });
        } catch (error) {
            if (error instanceof NotFoundError) {
                res.status(404).json({ error: error.message })
            } else {
                res.status(500).json({ error: error instanceof Error ? error.message : "Error al actualizar marcas" })
            }
        }
    }

    async deleteBrand(req:Request,res:Response){
        try {
            await this.brandService.deleteBrand(Number(req.params.id));
            res.status(200).json({
                "message":"Marca eliminado correctamente!"
            })
        } catch (error) {
            if(error instanceof NotFoundError){
                res.status(404).json({error:error.message});
                }else{
                    res.status(500).json({error:error instanceof Error ? error.message : "Error al eliminar marca"});
                }
        }
    }
}