import { Repository } from "typeorm";
import { Role } from "./role.entity";
import { AppDataSource } from "../config/database";
import { RequestRoleI } from "./interfaces/requestRoleI";
import { NotFoundError } from "../errors/NotFoundError";


export class RoleService{
    private roleRepository:Repository<Role>;

    constructor(){
        this.roleRepository=AppDataSource.getRepository(Role);
    }

    async getRoles(){
        return await this.roleRepository.find();
    }

    async createRole(role:RequestRoleI){
       return this.roleRepository.save(role);
    }

    async updateRole(role:RequestRoleI,id:number){
        const roleFound=await this.roleRepository.findOne({where:{id}});
        if(!roleFound) throw new NotFoundError("Rol no encontrado");
        roleFound.name=role.name;
        return await this.roleRepository.save(roleFound);
    }

    async deleteRole(id:number){
        const roleFound=await this.roleRepository.findOne({where:{id}});
        if(!roleFound) throw new NotFoundError("Rol no encontrado");
        await this.roleRepository.remove(roleFound);
    }
}