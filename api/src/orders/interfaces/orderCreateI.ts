export interface OrderCreateI{
address:string;
total:number;
client_id:number;
order_shoes:itemsOrderI[];
}

export interface itemsOrderI{
    shoe_id:number;
    quantity:number;
    subtotal:number; 
}