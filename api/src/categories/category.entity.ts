import { IsEnum, IsNotEmpty, MaxLength } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CategoryShoe } from "../relations/category-shoe.entity";

export enum CategoryType{
    AUDIENCIA="audiencia",
    STYLE="style",
}

@Entity()
export class Category{
    @PrimaryGeneratedColumn()
    id!:number;

    @Column()
    @IsNotEmpty()
    @MaxLength(50)
    name!:string;

    @Column({type:'enum',enum:CategoryType})
    @IsEnum(CategoryType,{message:'El tipo debe ser audiencia o style',})
    type!:CategoryType;

    @OneToMany(()=>CategoryShoe,categoryShoe=>categoryShoe.category)
    categoryShoes!:CategoryShoe[]
}