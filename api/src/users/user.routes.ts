import { Router } from "express";
import { UserController } from "./user.controller";

const route=Router();
const userController=new UserController();

route.get('/users',userController.getUsers.bind(userController));
route.post('/users',userController.createUser.bind(userController));
route.put('/users/:id',userController.updateUser.bind(userController));
route.delete('/user:id',userController.deleteUser.bind(userController));

export default route;