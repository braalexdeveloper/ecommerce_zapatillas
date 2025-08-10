import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JwtPayloadI } from './jwtPayload.interface';

const JWT_SECRET = process.env.JWT_SECRET || 'tiburoncin';


export function verificarJWT(req:Request,res:Response,next:NextFunction){
    const token = req.cookies.token; // ✅ obtiene el token de las cookies

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token,JWT_SECRET) as JwtPayloadI;
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Token inválido' });
  }
    /*const authHeader=req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        res.status(401).json({message:'Token no proporcionado'});
        return;
        
    }

    const token=authHeader?.split(" ")[1];

    try {
        
        const decoded=jwt.verify(token,JWT_SECRET) as JwtPayloadI;
        
        req.user=decoded;
        
        next();

    } catch (error) {
        res.status(401).json({ message: 'Token inválido' });
        return;
    }
*/
}

export function verificarJWTOptional(req:Request,res:Response,next:NextFunction){
    const token = req.cookies.token; // ✅ obtiene el token de las cookies
  
  try {
    if (!token) {
    req.user = null; // no hay token, invitado
    return next();
   
  }
    const decoded = jwt.verify(token,JWT_SECRET) as JwtPayloadI;
    req.user = decoded;
    next();
  } catch (err) {
      req.user = null; // token inválido, tratar como invitado
    next();
  }
   
}
