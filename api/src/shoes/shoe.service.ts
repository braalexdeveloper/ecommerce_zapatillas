import { Repository } from "typeorm";
import { Shoe } from "./shoe.entity";
import { AppDataSource } from "../config/database";
import { NotFoundError } from "../errors/NotFoundError";
import { ShoeInterface } from "./shoe.interface";

export class ShoeService{
    private shoeRepository:Repository<Shoe>;

    constructor(){
        this.shoeRepository=AppDataSource.getRepository(Shoe);

    }

    async getShoes(){
        return await this.shoeRepository.find();
    }

    async getShoe(id:number){
      const shoeFound=await this.shoeRepository.findOne({where:{id}});
      if(!shoeFound) throw new NotFoundError("Zapatilla no encontrada");
      return shoeFound;
    }

    async createShoe(shoe:ShoeInterface){
     const createdShoe=this.shoeRepository.create(shoe);
     await this.shoeRepository.save(createdShoe);
     return createdShoe;
    }
}