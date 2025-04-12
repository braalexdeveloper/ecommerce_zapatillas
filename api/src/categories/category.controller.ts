import { Request, Response } from "express";
import { CategoryService } from "./category.service";
import { NotFoundError } from "../errors/NotFoundError";

export class CategoryController {
    private categoryService: CategoryService;

    constructor() {
        this.categoryService = new CategoryService();
    }

    async getCategories(req: Request, res: Response) {
        try {
            const categories = await this.categoryService.getCategories();
            res.status(200).json(categories);
        } catch (error) {
            res.status(500).json({ error: error instanceof Error ? error.message : "Error al obtener categorias" });
        }
    }

    async getCategory(req: Request, res: Response) {
        try {
            const category = await this.categoryService.getCategory(Number(req.params.id));
            res.status(200).json(category);
        } catch (error) {
            if(error instanceof NotFoundError){
                res.status(404).json({error:error.message});
                }else{
                    res.status(500).json({error:error instanceof Error ? error.message : "Error al obtener categoria"});
                }
        }
    }

    async createCategory(req:Request,res:Response){
        try {
            const categoryCreated=await this.categoryService.createCategory(req.body);
            res.status(201).json({msg:"Categoria creada correctamente",category:categoryCreated});
        } catch (error) {
            res.status(500).json({ error: error instanceof Error ? error.message : "Error al crear categorias" });
        }
    }

    async updateCategory(req:Request,res:Response){
        try {
            const category = await this.categoryService.updateCategory(Number(req.params.id),req.body);
            res.status(200).json({
                "message":"Categoria actualizada correctamente!",
                category
            });
        } catch (error) {
            if(error instanceof NotFoundError){
                res.status(404).json({error:error.message});
                }else{
                    res.status(500).json({error:error instanceof Error ? error.message : "Error al actualizar categoria"});
                }
        }
    }

    async deleteCategory(req:Request,res:Response){
        try {
            await this.categoryService.deleteCategory(Number(req.params.id));
            res.status(200).json({
                "message":"Categoria eliminado correctamente!"
            })
        } catch (error) {
            if(error instanceof NotFoundError){
                res.status(404).json({error:error.message});
                }else{
                    res.status(500).json({error:error instanceof Error ? error.message : "Error al eliminar categoria"});
                }
        }
    }
}