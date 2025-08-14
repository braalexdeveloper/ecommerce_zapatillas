import { Router } from "express";
import { AuthController } from "./auth.controller";
import { verificarJWT } from "../utils/authMiddleware";


const router=Router();
const authController=new AuthController();

router.post('/auth/login',authController.login.bind(authController));
router.post('/auth/logout',authController.logout.bind(authController));
router.post('/auth/register',authController.register.bind(authController));
router.get('/auth/me',verificarJWT,authController.me.bind(authController));

export default router;
