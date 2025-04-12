import { IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { ShoeSize } from "../relations/shoe-size.entity";

@Entity()
export class Size{
    @PrimaryGeneratedColumn()
    id!:number;

    @Column()
    @IsNotEmpty()
    size_value!:number;
  
   
    @OneToMany(()=>ShoeSize,shoeSize=>shoeSize.size)
    shoeSizes!:ShoeSize[]
}