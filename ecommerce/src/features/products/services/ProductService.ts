import axios from 'axios';
import type { Product } from '../types/Product';
import type { ProductList } from '../types/ProductsList';
import type { Options } from '../types/Options';

const API_URL = "http://localhost:5000/api/shoes";



export const fetchProducts = async (dataOptions?: Options): Promise<ProductList> => {
    let parametros:string[] =[];
    if (dataOptions?.order) {
        parametros.push(`orderPrice=${dataOptions.order}`);
    }

    if (dataOptions?.brands) {
        parametros.push(`brands=${dataOptions.brands}`);
    }

    if (dataOptions?.categories) {
        parametros.push(`categories=${JSON.stringify(dataOptions.categories)}`);
    }

    const query=parametros.length ? `?${parametros.join('&')}` : '';
    const response = await axios.get(API_URL + query);
    return response.data;
}

export const fetchProduct = async (id: number): Promise<Product> => {
    const response = await axios.get(API_URL + `/${id}`);
    return response.data;
}