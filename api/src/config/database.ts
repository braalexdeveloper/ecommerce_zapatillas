import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from 'dotenv';
import { Category } from "../categories/category.entity";
import { Brand } from "../brands/brand.entity";
import { Size } from "../sizes/size.entity";
import { Image } from "../images/image.entity";
import { Shoe } from "../shoes/shoe.entity";
import { ShoeSize } from "../relations/shoe-size.entity";
import { CategoryShoe } from "../relations/category-shoe.entity";
import { Client } from "../clients/client.entity";
import { Order } from "../orders/order.entity";
import { OrderShoe } from "../relations/order-shoe.entity";
import { Role } from "../roles/role.entity";
import { User } from "../users/user.entity";

dotenv.config();

export const AppDataSource=new DataSource({
    type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'brayan',
  database: process.env.DB_NAME || 'ecommercenodets',
  synchronize: true, // ⚠️ Solo en desarrollo (cambiar a false en producción)
  logging: true,
  entities: [Category,Brand,Size,Image,Shoe,ShoeSize,CategoryShoe,Role,User,Client,Order,OrderShoe], // Directorio de modelos
  migrations: [],
})