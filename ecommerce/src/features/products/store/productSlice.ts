import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import { fetchProduct, fetchProducts } from "../services/ProductService";

import { Product } from "../types/Product";

interface ProductState{
    products:Product[];
    product:Product | null;
    loading:boolean;
    error:string | null;
}

const initialState:ProductState={
    products:[],
    product:null,
    loading:false,
    error:null
}

//Thunk para cargar productos
export const getProducts=createAsyncThunk("products/fetch",async()=>{
    return await fetchProducts();
});

//Thunk para cargar producto
export const getProductById=createAsyncThunk("products/fetchById",async(id:number)=>{
   return await fetchProduct(id);
});

const productSlice=createSlice({
    name:'products',
    initialState,
    reducers:{},
    extraReducers(builder){
        builder
        .addCase(getProducts.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(getProducts.fulfilled,(state,action)=>{
            state.products=action.payload;
            state.loading=false;
        })
        .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error al cargar productos";
       })

       //producto individual
       .addCase(getProductById.pending,(state)=>{
         state.loading=true;
         state.error=null;
         state.product=null;
       })
       .addCase(getProductById.fulfilled,(state,action)=>{
         state.loading=false;
         state.product=action.payload;
       })
       .addCase(getProductById.rejected,(state,action)=>{
state.loading=false;
state.error=action.error.message ?? "Error al cargar producto";
       });
    }
})

export default productSlice.reducer;