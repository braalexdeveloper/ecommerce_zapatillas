import { Router } from 'express';
import { createPreference, webhookHandler } from './mercadoPago.controller';


const router = Router();

router.post('/mercadopago/create-preference', createPreference);
router.post('/mercadopago/webhook', webhookHandler);

export default router;