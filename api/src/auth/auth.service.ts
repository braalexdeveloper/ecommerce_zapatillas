import { Repository } from "typeorm"
import { User } from "../users/user.entity"
import { AppDataSource } from "../config/database";
import { AuthI } from "./auth.interface";
import { NotFoundError } from "../errors/NotFoundError";
import bcrypt from 'bcrypt';
import { ResponseAuthInterface } from "./responseAuth.interface";
import { generateToken } from "../utils/jwt";
import { Response } from "express";
import { Role } from "../roles/role.entity";

const SALT_ROUNDS=10;

export class AuthService {
    private userRepository: Repository<User>;

    constructor() {
        this.userRepository = AppDataSource.getRepository(User);
    }

    async login(user: AuthI, res: Response): Promise<ResponseAuthInterface> {
        const userFound = await this.userRepository.findOne({ where: { email: user.email }, relations: ['role', 'client'] });
        if (!userFound) throw new NotFoundError("Usuario no existe");

        const isPasswordCorrect = await bcrypt.compare(user.password, userFound.password);
        if (!isPasswordCorrect) throw new Error("La contraseña es incorrecta");

        const payload = {
            id: userFound.id,
            client_id:userFound.client?.id,
            email: userFound.email,
            role: userFound.role?.name,
        };

        const token = generateToken(payload);

        //set cookie en la respuesta
        res.cookie('token',token,{
            httpOnly:true,
            secure:false,
            sameSite:'strict',
            maxAge:1000*60*60*24,//1 día
        })

        const userResponse: ResponseAuthInterface = {
            id: userFound.id,
            email: userFound.email,
            role: userFound.role.name,
            name: userFound.client?.name || '',
            client_id:userFound.client?.id || ''
        }

        return userResponse;
    }

    async register(user:AuthI){

        return await AppDataSource.transaction(async(manager)=>{
            const userRepo=manager.getRepository(User);
            const roleRepo=manager.getRepository(Role);

           if(!user.email || !user.password) throw new Error("Usuario y contraseña son obligatorios");
        const userExist=await userRepo.findOne({where:{email:user.email}});
        if(userExist) throw new Error("Email ya registrado!");
        const passHash=await bcrypt.hash(user.password,SALT_ROUNDS);

        const role=await roleRepo.findOne({where:{name:'user'}});
        if(!role) throw new NotFoundError("Rol no existe");
       const userCreated=await userRepo.save({email:user.email,password:passHash,role});
       return userCreated;
        });
        
    }


    
}