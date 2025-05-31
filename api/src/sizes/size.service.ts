import { Repository } from "typeorm";
import { Size } from "./size.entity";
import { AppDataSource } from "../config/database";

export class SizeService{
    private sizeRepository:Repository<Size>;

    constructor(){
        this.sizeRepository=AppDataSource.getRepository(Size);
    }

    async getSizes(){
        return await this.sizeRepository.find();
    }

}