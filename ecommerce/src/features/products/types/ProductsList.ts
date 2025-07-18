import type { Product } from "./Product";

export interface ProductList {
    totalItems: number;
    currentPage: number;
    totalPages: number;
    items: Product[];
}