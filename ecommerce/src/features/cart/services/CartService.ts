
import type { Product } from "../../products/types/Product";

export interface ProductCart extends Product{
    quantity?:number;
    subtotal?:number;
}

const STORAGE_KEY = "carrito";

export const getCart = (): ProductCart[] => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
};

export const saveCart = (cart: ProductCart[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
};

export const addToCart = (item: ProductCart) => {
  
  const cart = getCart();
  const index=cart.findIndex(product=>product.id===item.id);
  if(index!==-1){
    cart[index].quantity=(cart[index].quantity || 1)+1;
    cart[index].subtotal=cart[index].quantity*cart[index].price;
  }else{
    cart.push({...item,quantity:1,subtotal:item.price});
    
  }
  
  saveCart(cart);
};

export const removeFromCart = (id: number) => {
    console.log('removeId',id)
  const cart = getCart().filter(item => Number(item.id) !== Number(id));
  console.log('remove',cart)
  saveCart(cart);
  return cart;
};
