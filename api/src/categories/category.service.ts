import { Repository } from "typeorm";
import { Category } from "./category.entity";
import { AppDataSource } from "../config/database";
import { CategoryInterface } from "./category.interface";
import { NotFoundError } from "../errors/NotFoundError";

export class CategoryService{
    private categoryRepository:Repository<Category>;

    constructor(){
        this.categoryRepository=AppDataSource.getRepository(Category);
    }

    async getCategories(){
        return await this.categoryRepository.find();
    }

    async getCategory(id:number){
       return await this.categoryRepository.findOne({where:{id}});
    }

    async createCategory(category:CategoryInterface){
     const createdCategory=this.categoryRepository.create(category);
     await this.categoryRepository.save(createdCategory);
     return createdCategory;
    }

    async updateCategory(id:number,category:CategoryInterface){
        const categoryFound=await this.categoryRepository.findOne({where:{id}});
        if(!categoryFound) throw new NotFoundError("Categoria no encontrada!");
 
        Object.assign(categoryFound,category);
        await this.categoryRepository.save(categoryFound);
        return categoryFound;
    }

    async deleteCategory(id: number) {
        const categoryFound = await this.categoryRepository.findOne({ where: { id } });
        if (!categoryFound) throw new NotFoundError("Categoria no encontrada!");
        await this.categoryRepository.remove(categoryFound);
    }
}