import { Router } from "express";
import { AuthController } from "./auth.controller";


const router=Router();
const authController=new AuthController();

router.post('/auth/login',authController.login.bind(authController));
router.post('/auth/logout',authController.logout.bind(authController));

export default router;
