import { Router } from "express";
import { ShoeController } from "./shoe.controller";
import upload from "../config/multer";

const shoeController=new ShoeController();
const router=Router();

router.get('/shoes',shoeController.getShoes.bind(shoeController));
router.get('/shoes/:id',shoeController.getShoe.bind(shoeController));
router.post('/shoes',upload.array('arrayImages'),shoeController.createShoe.bind(shoeController));
router.delete('/shoes/:id',shoeController.deleteShoe.bind(shoeController));

export default router;