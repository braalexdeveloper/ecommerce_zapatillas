import './types/global';

import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';


import { AppDataSource } from "./config/database";
import categoryRoutes from './categories/category.route';
import brandRoutes from './brands/brand.route';
import shoeRoutes from './shoes/shoe.route';
import sizeRoutes from './sizes/size.route';
import roleRoutes from './roles/role.routes';
import userRoutes from './users/user.routes';
import clientRoutes from './clients/client.routes';
import orderRoutes from './orders/order.routes';
import mercadoPagoRoutes from './mercadoPago/mercadoPago.routes';
import authRoutes from './auth/auth.routes';
import path from "path";

dotenv.config();

const app=express();

//Middleware
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true,//permite enviar cokkies
}));

app.use(cookieParser());
app.use(express.json());
app.use('/api',categoryRoutes);
app.use('/api',brandRoutes);
app.use('/api',shoeRoutes);
app.use('/api',sizeRoutes);
app.use('/api',roleRoutes);
app.use('/api',userRoutes);
app.use('/api',clientRoutes);
app.use('/api',orderRoutes);
app.use('/api',mercadoPagoRoutes);
app.use('/api',authRoutes);

app.use('/uploads',express.static(path.join(__dirname,'uploads')));




AppDataSource.initialize().then(()=>{

    app.listen(5000,()=>console.log('🚀 Servidor corriendo en el puerto 5000'));
}).catch((error) => {
    console.error('❌ Error al conectar la base de datos', error);
    process.exit(1); // Termina el proceso si la BD no se conecta
})