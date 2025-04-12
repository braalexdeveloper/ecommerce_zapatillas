import { Router } from "express";
import { CategoryController } from "./category.controller";

const router=Router();
const categoryController=new CategoryController();

router.get('/categories',categoryController.getCategories.bind(categoryController));
router.get('/categories/:id',categoryController.getCategory.bind(categoryController));
router.post('/categories',categoryController.createCategory.bind(categoryController));
router.put('/categories/:id',categoryController.updateCategory.bind(categoryController));
router.delete('/categories/:id',categoryController.deleteCategory.bind(categoryController));

export default router;