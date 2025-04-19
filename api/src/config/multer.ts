import multer from "multer";
import { Request } from "express";
import path from "path";
import fs from 'fs'

// Ruta de la carpeta de uploads
const uploadDir = path.join(__dirname, '../uploads');

// Crear la carpeta si no existe
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}


const storage=multer.diskStorage({
    destination:function(req:Request,file,cb){
        cb(null,uploadDir);
    },
    filename:function(req:Request,file,cb){
        const uniqueSuffix=Date.now()+'-'+Math.round(Math.random()*1E9);
        cb(null,file.fieldname+'-'+uniqueSuffix+path.extname(file.originalname));
    }

});

const upload=multer({
    storage:storage,
    limits:{fileSize:5*1024*1024},
    fileFilter:(req,file,cb)=>{
const filetypes=/jpeg|jpg|png|webp/;
const mimetype=filetypes.test(file.mimetype);
const extname=filetypes.test(path.extname(file.originalname).toLowerCase());

if(mimetype && extname){
return cb(null,true);
}

cb(new Error('Solo se permiten imágenes (jpeg, jpg, png, webp)'));
    }
});

export const uploadMultiple = upload.array('arrayImages', 10); // Máximo 10 imágenes

export default upload;