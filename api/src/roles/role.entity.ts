import { IsNotEmpty } from "class-validator";
import { Column, Entity,OneToMany,PrimaryGeneratedColumn } from "typeorm";
import { User } from "../users/user.entity";


@Entity()
export class Role{
    @PrimaryGeneratedColumn()
    id!:number;

    @Column({unique:true})
    @IsNotEmpty()
    name!:string;

    @OneToMany(()=>User,user=>user.role)
    users!:User[]


}