import { Router } from "express";
import { BrandController } from "./brand.controller";

const router=Router();

const brandController=new BrandController();

router.get('/brands',brandController.getBrands.bind(brandController));
router.get('/brands/:id',brandController.getBrand.bind(brandController));
router.post('/brands',brandController.createBrand.bind(brandController));
router.put('/brands/:id',brandController.updateBrand.bind(brandController));
router.delete('/brands/:id',brandController.deleteBrand.bind(brandController));

export default router;