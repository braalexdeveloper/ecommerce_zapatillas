import { Repository } from "typeorm";
import { Brand } from "./brand.entity";
import { AppDataSource } from "../config/database";
import { NotFoundError } from "../errors/NotFoundError";
import { BrandInterface } from "./brand.interface";

export class BrandService{
    private brandRepository:Repository<Brand>;

    constructor(){
        this.brandRepository=AppDataSource.getRepository(Brand);
    }

    async getBrands(){
       return await this.brandRepository.find();
    }

    async getBrand(id:number){
        const brandFound=await this.brandRepository.findOne({where:{id}});
        if (!brandFound) throw new NotFoundError("Marca no encontrada!");
    return brandFound;
    }

    async createBrand(brand:BrandInterface){
        const brandCreated=this.brandRepository.create(brand);
        await this.brandRepository.save(brandCreated);
        return brandCreated;
    }

    async updateBrand(id:number,brand:BrandInterface){
        const brandFound=await this.getBrand(id);
        Object.assign(brandFound,brand);
        await this.brandRepository.save(brandFound);
        return brandFound;
    }

    async deleteBrand(id:number){
        const brandFound=await this.getBrand(id);
        await this.brandRepository.remove(brandFound);
    }
}