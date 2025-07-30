import { Repository } from "typeorm";
import { Client } from "./client.entity";
import { AppDataSource } from "../config/database";
import { CreateClientInterface } from "./interfaces/createClient.interface";

import { NotFoundError } from "../errors/NotFoundError";
import { UpdateClientInterface } from "./interfaces/updateClient.interface";
import { User } from "../users/user.entity";


export class ClientService {

    private clientRepository: Repository<Client>;

    constructor() {
        this.clientRepository = AppDataSource.getRepository(Client);
    }

    async getClients() {
        const clients = await this.clientRepository.find();
        return clients;
    }

    async getClient(id: number) {
        const client = await this.clientRepository.findOne({ where: { id } });
        if (!client) throw new NotFoundError("Cliente no encontrado");
        return client;
    }


    async createClient(client: CreateClientInterface) {
        return await AppDataSource.transaction(async (manager) => {
            const clientRepo = manager.getRepository(Client);
            const userRepo = manager.getRepository(User);
            
            
            const newClient=clientRepo.create({
                name:client.name,
                lastName:client.lastName,
                dni:client.dni,
                phone:client.phone
            });

            if (client.user_id) {
              const userFound=await userRepo.findOne({where:{id:client.user_id}});
              if(!userFound) throw new NotFoundError("Usuario no encontrado");
              newClient.user=userFound;
            }
            
            return await clientRepo.save(newClient);
            
        });

    }

    async updateClient(client: UpdateClientInterface, id: number) {
        const foundClient = await this.clientRepository.findOne({ where: { id } });
        if (!foundClient) throw new NotFoundError("Cliente no encontrado");
        Object.assign(foundClient, client);
        
        await this.clientRepository.save(foundClient);
        return foundClient;
    }

    async deleteClient(id: number) {
        const clientFound = await this.clientRepository.findOne({ where: { id } });
        if (!clientFound) throw new NotFoundError("Cliente no encontrado");
        await this.clientRepository.remove(clientFound);

    }
}