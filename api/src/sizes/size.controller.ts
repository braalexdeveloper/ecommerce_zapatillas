import { Response,Request } from "express";
import { SizeService } from "./size.service"



export class SizeController{
    private sizeService:SizeService;

    constructor(){
        this.sizeService=new SizeService();
    }

    async getSizes(req:Request,res:Response){
       try {
        const sizes=await this.sizeService.getSizes();
        res.status(200).json(sizes);
       } catch (error) {
        res.status(500).json({error:error instanceof Error ? error.message : 'Error al obtener tallas'})
       }
    }
}