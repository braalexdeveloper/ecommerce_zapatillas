import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "../orders/order.entity";
import { Shoe } from "../shoes/shoe.entity";
import { IsNotEmpty } from "class-validator";

@Entity()
export class OrderShoe{

    @PrimaryGeneratedColumn()
    id!:number;

    @IsNotEmpty()
    @Column()
    quantity!:number;

    @IsNotEmpty()
    @Column()
    subtotal!:number;

    @ManyToOne(()=>Order,order=>order.order_shoes,{onDelete:'CASCADE'})
    order!:Order;

    @ManyToOne(()=>Shoe,shoe=>shoe.order_shoes)
    shoe!:Shoe;

}