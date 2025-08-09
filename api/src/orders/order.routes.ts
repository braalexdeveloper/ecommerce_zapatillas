import { Router } from "express";
import { OrderController } from "./order.controller";
import { verificarJWT } from "../utils/authMiddleware";

const route=Router();
const orderController=new OrderController();

route.get('/orders',orderController.getOrders.bind(orderController));
route.get('/orders/client/:id',verificarJWT,orderController.getOrdersByClient.bind(orderController));
route.post('/orders',orderController.createOrder.bind(orderController));

export default route;