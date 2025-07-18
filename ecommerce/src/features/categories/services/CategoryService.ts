import axios from "axios";
import type { Category } from "../types/Category";

const API_URL = "http://localhost:5000/api/categories";


export const fetchCategories=async():Promise<Category[]>=>{
    const response=await axios.get(API_URL);
    return response.data;
}