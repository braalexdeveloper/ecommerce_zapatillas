import { Router } from "express";
import { ClientController } from "./client.controller";
import { verificarJWT } from "../utils/authMiddleware";

const route=Router();
const clientController=new ClientController();

route.get('/clients',clientController.getClients.bind(clientController));
route.get('/clients/:id',verificarJWT,clientController.getClient.bind(clientController));
route.post('/clients',verificarJWT,clientController.createClient.bind(clientController));
route.put('/clients/:id',verificarJWT,clientController.updateClient.bind(clientController));
route.delete('/clients/:id',verificarJWT,clientController.deleteClient.bind(clientController));

export default route;