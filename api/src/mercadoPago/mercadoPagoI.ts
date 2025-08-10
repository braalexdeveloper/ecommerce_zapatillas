import { itemsOrderI } from "../orders/interfaces/orderCreateI";

export interface MercadoPagoI{
    address:string;
    total:number;
    name:string;
    lastName:string;
    dni:string;
    phone?:string;
    email:string;
    client_id?:number;
    order_shoes:itemsOrderI[];
}