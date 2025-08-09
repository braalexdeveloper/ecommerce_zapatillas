import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { NotFoundError } from "../errors/NotFoundError";

export class AuthController{
    private authService:AuthService;

    constructor(){
        this.authService=new AuthService();
    }

    async login(req:Request,res:Response){
        try {
            
            const user=await this.authService.login(req.body,res);
            res.status(200).json(user);
        } catch (error) {
            if(error instanceof NotFoundError){
                res.status(404).json(error)
            }else{
                res.status(500).json({error:error instanceof Error ? error.message : "Error al loguearse"});
            }
        }
    }

    logout(req:Request,res:Response){
        res.clearCookie("token",{
            httpOnly:true,
            secure:false,
            sameSite:'strict'
        });
        return res.status(200).json({message:"Sesión cerrada correctamente"})
    }
}
