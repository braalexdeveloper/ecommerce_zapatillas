import { Repository } from "typeorm";
import { User } from "./user.entity";
import { AppDataSource } from "../config/database";
import { RequestUserI } from "./interface/requestUserI";
import bcrypt from 'bcrypt';
import { NotFoundError } from "../errors/NotFoundError";
import { Role } from "../roles/role.entity";

const SALT_ROUNDS=10;


export class UserService{
    private userRepository:Repository<User>;
    private roleRepository:Repository<Role>;

    constructor(){
        this.userRepository=AppDataSource.getRepository(User);
        this.roleRepository=AppDataSource.getRepository(Role);
    }

    async getUsers(){
        return await this.userRepository.find();
    }

    async createUser(user:RequestUserI){
      
      const roleFound=await this.roleRepository.findOne({where:{id:user.role_id}});
      if(!roleFound) throw new NotFoundError("Rol no encontrado");

      const hashPassword=await bcrypt.hash(user.password,SALT_ROUNDS);
      return await this.userRepository.save({
        email:user.email,
        password:hashPassword,
        role:roleFound
      });

    }

    async updateUser(user:RequestUserI,id:number){
        const userFound=await this.userRepository.findOne({where:{id}});
        if(!userFound) throw new NotFoundError("Usuario no encontrado");

         const roleFound=await this.roleRepository.findOne({where:{id:user.role_id}});
        if(!roleFound) throw new NotFoundError("Rol no encontrado");

        if(user.password){
            const hashPassword=await bcrypt.hash(user.password,SALT_ROUNDS);
          userFound.password=hashPassword
        }
        userFound.email=user.email;
        userFound.role=roleFound;
        
        return await this.userRepository.save(userFound);
    };

    async deleteUser(id:number){
        const userFound=await this.userRepository.findOne({where:{id}});
        if(!userFound) throw new NotFoundError("Usuario no encontrado");
        await this.userRepository.remove(userFound);
    }


}