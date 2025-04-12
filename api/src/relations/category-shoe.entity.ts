import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "../categories/category.entity";
import { Shoe } from "../shoes/shoe.entity";

@Entity()
export class CategoryShoe{
    @PrimaryGeneratedColumn()
    id!:number;

    @ManyToOne(()=>Category,category=>category.categoryShoes)
    category!:Category

    @ManyToOne(()=>Shoe,shoe=>shoe.categoryShoes)
    shoe!:Shoe


}