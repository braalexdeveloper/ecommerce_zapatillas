import { Router } from "express";
import { RoleController } from "./role.controller";

const route=Router();
const roleController=new RoleController();

route.get('/roles',roleController.getRoles.bind(roleController));
route.post('/roles',roleController.createRole.bind(roleController));
route.put('/roles/:id',roleController.updateRole.bind(roleController));
route.delete('/route/:id',roleController.deleteRole.bind(roleController));

export default route;