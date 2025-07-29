import { IsNotEmpty, IsOptional, MaxLength } from "class-validator";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CategoryShoe } from "../relations/category-shoe.entity";
import { ShoeSize } from "../relations/shoe-size.entity";
import { Brand } from "../brands/brand.entity";
import { Image } from "../images/image.entity";
import { OrderShoe } from "../relations/order-shoe.entity";

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

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    @IsNotEmpty()
    price!:number;

    
    @OneToMany(()=>CategoryShoe,categoryShoe=>categoryShoe.shoe,{ cascade: true })
    categoryShoes!:CategoryShoe[]

    @OneToMany(()=>ShoeSize,shoeSize=>shoeSize.shoe,{ cascade: true })
    shoeSizes!:ShoeSize[]

    @ManyToOne(()=>Brand,brand=>brand.shoes)
    brand!:Brand

    @OneToMany(()=>Image,image=>image.shoe, { cascade: true , onDelete: "CASCADE"})
    images?:Image[]

    @OneToMany(()=>OrderShoe,order_shoes=>order_shoes.shoe)
    order_shoes!:OrderShoe;
}