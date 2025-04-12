import { IsNotEmpty, IsOptional, MaxLength } from "class-validator";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CategoryShoe } from "../relations/category-shoe.entity";
import { ShoeSize } from "../relations/shoe-size.entity";
import { Brand } from "../brands/brand.entity";
import { Image } from "../images/image.entity";

@Entity()
export class Shoe{
    @PrimaryGeneratedColumn()
    id!:number;

    @Column()
    @IsNotEmpty()
    @MaxLength(100)
    name!:string;

    @Column({ nullable: true }) // Permite valores nulos
    @IsOptional() // Indica que el campo es opcional en las validaciones
    description!:string;

    @Column()
    @IsNotEmpty()
    price!:number;

    
    @OneToMany(()=>CategoryShoe,categoryShoe=>categoryShoe.shoe)
    categoryShoes!:CategoryShoe[]

    @OneToMany(()=>ShoeSize,shoeSize=>shoeSize.shoe)
    shoeSizes!:ShoeSize[]

    @ManyToOne(()=>Brand,brand=>brand.shoes)
    brand!:Brand

    @OneToMany(()=>Image,image=>image.shoe, { cascade: true })
    images?:Image[]
}