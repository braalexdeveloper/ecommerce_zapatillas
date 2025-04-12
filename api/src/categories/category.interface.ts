import { CategoryType } from "./category.entity";

export interface CategoryInterface{
    id?:number;
    name:string; 
    type:CategoryType;   
}