import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';

import { AppDataSource } from "./config/database";
import categoryRoutes from './categories/category.route';
import brandRoutes from './brands/brand.route';

dotenv.config();

const app=express();

//Middleware
app.use(cors());
app.use(express.json());
app.use('/api',categoryRoutes);
app.use('/api',brandRoutes);

AppDataSource.initialize().then(()=>{

    app.listen(5000,()=>console.log('🚀 Servidor corriendo en el puerto 5000'));
}).catch((error) => {
    console.error('❌ Error al conectar la base de datos', error);
    process.exit(1); // Termina el proceso si la BD no se conecta
})