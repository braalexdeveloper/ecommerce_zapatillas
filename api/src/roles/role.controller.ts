import { Request, Response } from "express";
import { RoleService } from "./role.service";
import { NotFoundError } from "../errors/NotFoundError";


export class RoleController{
    private roleService:RoleService;

    constructor(){
        this.roleService=new RoleService();
    }

    async getRoles(req:Request,res:Response){
        try {
            const roles=await this.roleService.getRoles();
            res.status(200).json(roles);
        } catch (error) {
            if(error instanceof NotFoundError){
                res.status(404).json({error:error.message});
            }else{
                res.status(500).json({error:error instanceof Error ? error.message : 'Error al obtener roles'});
            }
        }
    }

    
    async createRole(req:Request,res:Response){
        try {
            const role=await this.roleService.createRole(req.body);
            res.status(201).json({msg:"Rol creado correctamente",role});
        } catch (error) {
            if(error instanceof NotFoundError){
                res.status(404).json({error:error.message});
            }else{
                res.status(500).json({error:error instanceof Error ? error.message : 'Error al crear rol'});
            }
        }
    }

    async updateRole(req:Request,res:Response){
        try {
            const role=await this.roleService.updateRole(req.body,Number(req.params.id));
            res.status(200).json({msg:"Rol actualizado correctamente",role});
        } catch (error) {
            if(error instanceof NotFoundError){
                res.status(404).json({error:error.message});
            }else{
                res.status(500).json({error:error instanceof Error ? error.message : 'Error al actualizar rol'});
            }
        }
    }

    async deleteRole(req:Request,res:Response){
        try {
            await this.roleService.deleteRole(Number(req.params.id));
            res.status(200).json({msg:"Rol eliminado correctamente"});
        } catch (error) {
            if(error instanceof NotFoundError){
                res.status(404).json({error:error.message});
            }else{
                res.status(500).json({error:error instanceof Error ? error.message : 'Error al eliminar rol'});
            }
        }
    }

}