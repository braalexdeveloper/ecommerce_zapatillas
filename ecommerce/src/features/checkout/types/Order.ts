export interface Order{
    address:string;
    total:number;
    client_id:number;
    order_shoes:ItemCart[];
}

interface ItemCart{
  shoe_id:number;
  quantity:number;
  subtotal:number;
}