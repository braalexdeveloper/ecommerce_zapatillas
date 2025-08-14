import axios from "axios";
import type { Order } from "../types/Order";

const API_URL = "http://localhost:5000/api/mercadopago/create-preference";

export const createOrder=async(order:Order)=>{
  const response=await axios.post(API_URL,order,{withCredentials:true});
  return response.data;
}