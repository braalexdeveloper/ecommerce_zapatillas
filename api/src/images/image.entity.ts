import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Shoe } from "../shoes/shoe.entity";

@Entity()
export class Image{
    @PrimaryGeneratedColumn()
    id!:number;

    @Column()
    @IsNotEmpty()
    url!:string;

    @Column({default:false})
    is_main!:boolean;

    @ManyToOne(()=>Shoe,shoe=>shoe.images, {
        onDelete: 'CASCADE'
      })
    shoe!:Shoe
}