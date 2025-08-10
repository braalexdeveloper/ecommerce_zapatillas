
import { JwtPayloadI } from '../utils/jwtPayload.interface';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayloadI | null;
    }
  }
}



export {};