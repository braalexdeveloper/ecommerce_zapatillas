import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../roles/role.entity";
import { Exclude } from "class-transformer";
import { Client } from "../clients/client.entity";


@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id!:number;

    @IsNotEmpty()
    @Column({unique:true})
    email!:string;

    @IsNotEmpty()
    @Exclude()
    @Column()
    password!:string;

    @ManyToOne(()=>Role,role=>role.users)
    role!:Role;

    @OneToOne(()=>Client,client=>client.user)
    client?:Client;
}