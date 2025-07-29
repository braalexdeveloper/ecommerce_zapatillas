import { Router } from "express";
import { ClientController } from "./client.controller";

const route=Router();
const clientController=new ClientController();

route.get('/clients',clientController.getClients.bind(clientController));
route.get('/clients/:id',clientController.getClient.bind(clientController));
route.post('/clients',clientController.createClient.bind(clientController));
route.put('/clients/:id',clientController.updateClient.bind(clientController));
route.delete('/clients/:id',clientController.deleteClient.bind(clientController));

export default route;