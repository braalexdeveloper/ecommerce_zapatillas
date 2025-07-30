import { Request, Response } from "express";
import { UserService } from "./user.service";
import { NotFoundError } from "../errors/NotFoundError";


export class UserController{
    private userService:UserService;

    constructor(){
        this.userService=new UserService();
    }

    async getUsers(req:Request,res:Response){
        try {
            const users=await this.userService.getUsers();
            res.status(200).json(users);
        } catch (error) {
            if(error instanceof NotFoundError){
                res.status(404).json({error:error.message});
            }else{
                res.status(500).json({error:error instanceof Error ? error.message : "Error al obtener users"});
            }
        }
    }

    async createUser(req:Request,res:Response){
        try {
            const user=await this.userService.createUser(req.body);
            res.status(201).json({msg:"Usuario creado correctamente",user});
        } catch (error) {
            if(error instanceof NotFoundError){
                res.status(404).json({error:error.message});
            }else{
                res.status(500).json({error:error instanceof Error ? error.message : "Error al crear usuario"});
            }
        }
    }

    async updateUser(req:Request,res:Response){
        try {
            const user=await this.userService.updateUser(req.body,Number(req.params.id));
            res.status(200).json({msg:"Usuario actualizado correctamente",user});
        } catch (error) {
            if(error instanceof NotFoundError){
                res.status(404).json({error:error.message});
            }else{
                res.status(500).json({error:error instanceof Error ? error.message : "Error al actualizar usuario"});
            }
        }
    }


    async deleteUser(req:Request,res:Response){
        try {
            await this.userService.deleteUser(Number(req.params.id));
            res.status(201).json({msg:"Usuario eliminado correctamente"});
        } catch (error) {
            if(error instanceof NotFoundError){
                res.status(404).json({error:error.message});
            }else{
                res.status(500).json({error:error instanceof Error ? error.message : "Error al eliminar usuario"});
            }
        }
    }

}