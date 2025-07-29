import { Router } from "express";
import { OrderController } from "./order.controller";

const route=Router();
const orderController=new OrderController();

route.get('/orders',orderController.getOrders.bind(orderController));
route.post('/orders',orderController.createOrder.bind(orderController));

export default route;