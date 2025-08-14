import { Router } from 'express';
import { createPreference, webhookHandler } from './mercadoPago.controller';
import { verificarJWTOptional } from '../utils/authMiddleware';


const router = Router();

router.post('/mercadopago/create-preference',verificarJWTOptional,createPreference);
router.post('/mercadopago/webhook', webhookHandler);

export default router;