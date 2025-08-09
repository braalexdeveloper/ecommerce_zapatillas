import axios from "axios"

const API_URL = "http://localhost:5000/api/orders/client/";

export const getOrdersByClient=async(id:number)=>{
  const response=await axios.get(API_URL+id,{withCredentials:true});
  console.log(response.data)
  return response.data;
}