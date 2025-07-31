import axios from "axios";
import type { ClientI } from "../types/Client";

const API_URL = "http://localhost:5000/api/clients";

export const createClient=async(client:ClientI)=>{

const response=await axios.post(`${API_URL}`,client);
return response.data;

}