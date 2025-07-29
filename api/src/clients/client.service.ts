import { Repository } from "typeorm";
import { Client } from "./client.entity";
import { AppDataSource } from "../config/database";
import { CreateClientInterface } from "./interfaces/createClient.interface";

import { NotFoundError } from "../errors/NotFoundError";
import { UpdateClientInterface } from "./interfaces/updateClient.interface";


export class ClientService{

    private clientRepository:Repository<Client>;

    constructor(){
        this.clientRepository=AppDataSource.getRepository(Client);
    }

    async getClients(){
        const clients=await this.clientRepository.find();
        return clients;
    }

    async getClient(id:number){
       const client=await this.clientRepository.findOne({where:{id}});
       if(!client) throw new NotFoundError("Cliente no encontrado");
       return client;
    }


    async createClient(client:CreateClientInterface){
        
      const createClient=this.clientRepository.create(client);
      await this.clientRepository.save(createClient);
      return createClient;
    }

    async updateClient(client:UpdateClientInterface,id:number){
     const foundClient=await this.clientRepository.findOne({where:{id}});
        if(!foundClient) throw new NotFoundError("Cliente no encontrado");
        Object.assign(foundClient,client);
        await this.clientRepository.save(foundClient);
        return foundClient;
    }

    async deleteClient(id:number){
        const clientFound=await this.clientRepository.findOne({where:{id}});
        if(!clientFound) throw new NotFoundError("Cliente no encontrado");
        await this.clientRepository.remove(clientFound);
        
    }
}