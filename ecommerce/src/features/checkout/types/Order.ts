export interface Order{
    address:string;
    total:number;
    name:string;
    lastName:string;
    dni:string;
    phone?:string;
    email:string;
    order_shoes:ItemCart[];
}

interface ItemCart{
  shoe_id:number;
  quantity:number;
  subtotal:number;
}