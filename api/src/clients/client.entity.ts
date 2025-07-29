import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../users/user.entity";
import { IsNotEmpty } from "class-validator";
import { Order } from "../orders/order.entity";


@Entity()
export class Client{
    @PrimaryGeneratedColumn()
    id!:number;

    @IsNotEmpty()
    @Column()
    name!:string;

    @IsNotEmpty()
    @Column()
    lastName!:string;

    @Column({unique:true})
    dni!:string;

    @Column()
    phone?:string;

    @OneToOne(()=>User,user=>user.client,{nullable:true})
    @JoinColumn()
    user?:User;

    @OneToMany(()=>Order,order=>order.client)
    orders!:Order[];

}