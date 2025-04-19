import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Shoe } from "../shoes/shoe.entity";
import { Size } from "../sizes/size.entity";
import { IsNotEmpty } from "class-validator";

@Entity()
export class ShoeSize{
    @PrimaryGeneratedColumn()
    id!:number;

    @Column()
    @IsNotEmpty()
    stock!:number;

    @ManyToOne(()=>Shoe,shoe=>shoe.shoeSizes,{onDelete:'CASCADE'})
    shoe!:Shoe

    @ManyToOne(()=>Size,size=>size.shoeSizes)
    size!:Size
}