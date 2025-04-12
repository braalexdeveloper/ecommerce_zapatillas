import { IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Shoe } from "../shoes/shoe.entity";

@Entity()
export class Brand{
    @PrimaryGeneratedColumn()
    id!:number;

    @Column()
    @IsNotEmpty()
    name!:string;

    @OneToMany(()=>Shoe,shoe=>shoe.brand)
    shoes!:Shoe[]
}