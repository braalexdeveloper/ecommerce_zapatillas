import jwt, { SignOptions } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'tiburoncin';

export function generateToken(payload: object): string {
    const opciones: SignOptions = {
    expiresIn: '1h' as const, // Fuerza a ser aceptado como tipo válido
  };
    return jwt.sign(payload, JWT_SECRET, opciones);
}

export function verificarToken(token: string): any {
    return jwt.verify(token, JWT_SECRET);
}