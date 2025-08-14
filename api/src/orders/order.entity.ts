import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Client } from "../clients/client.entity";
import { OrderShoe } from "../relations/order-shoe.entity";
import { IsNotEmpty } from "class-validator";


@Entity()
export class Order{
    @PrimaryGeneratedColumn()
    id!:number;

    @IsNotEmpty()
    @Column()
    address!:string;

    @Column()
    date_sale!:Date;

    @IsNotEmpty()
    @Column({type:'decimal',precision:10,scale:2})
    total!:number;

    @ManyToOne(()=>Client,client=>client.orders)
    client!:Client;

    @OneToMany(()=>OrderShoe,order_shoes=>order_shoes.order)
    order_shoes!:OrderShoe[];
}