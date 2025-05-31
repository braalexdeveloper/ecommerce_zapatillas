import { Router } from "express";
import { SizeController } from "./size.controller";

const router=Router();
const sizeController=new SizeController();

router.get('/sizes',sizeController.getSizes.bind(sizeController));

export default router;