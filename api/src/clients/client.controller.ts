import { Request, Response } from "express";
import { ClientService } from "./client.service";
import { NotFoundError } from "../errors/NotFoundError";
import { ResponseClientInterface } from "./interfaces/responseClient.interface";


export class ClientController {
    private clientService: ClientService;

    constructor() {
        this.clientService = new ClientService();
    }

    async getClients(req: Request, res: Response) {
        try {
            console.log(req.user)
            const clients:ResponseClientInterface[]= await this.clientService.getClients();
            res.status(200).json(clients);

        } catch (error) {
            if (error instanceof NotFoundError) {
                res.status(404).json({ error: error.message })
            } else {
                res.status(500).json({ error: error instanceof Error ? error.message : "Error al obtener clientes" })
            }
        }
    }

    async getClient(req:Request,res:Response){
        try {
            const id=Number(req.params.id);
            const client:ResponseClientInterface=await this.clientService.getClient(id);
            res.status(200).json(client);
            
        } catch (error) {
            if(error instanceof NotFoundError){
                res.status(404).json({error:error.message})
            } else{
                res.status(500).json({error:error instanceof Error ? error.message : "Error al obtener Cliente"})
            }
        }
    }

    async createClient(req:Request,res:Response){
        try {
            const client=await this.clientService.createClient(req.body);
            res.status(201).json({message:'Cliente creado con éxito',client})
        } catch (error) {
            if(error instanceof NotFoundError){
                res.status(404).json({ error: error.message })
            }else{
                res.status(500).json({error:error instanceof Error ? error.message : "Error al crear cliente"})
            }
        }
    }

    async updateClient(req:Request,res:Response){
        try {
            const id=Number(req.params.id);
            const client:ResponseClientInterface=await this.clientService.updateClient(req.body,id);
            res.status(200).json({message:"Cliente actualizado con éxito",client})

        } catch (error) {
            if(error instanceof NotFoundError){
                res.status(404).json({error:error.message});
            }else{
                res.status(500).json({error:error instanceof Error ? error.message : "Error al actualizar cliente"});
            }
        }
    }

    async deleteClient(req:Request,res:Response){
        try {
            const id=Number(req.params.id);
            await this.clientService.deleteClient(id);
            res.status(200).json({message:"Cliente eliminado con éxito"});
        } catch (error) {
           if(error instanceof NotFoundError){
                res.status(404).json({error:error.message});
            }else{
                res.status(500).json({error:error instanceof Error ? error.message : "Error al eliminar cliente"});
            } 
        }
    }
}