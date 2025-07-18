import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchBrands } from "../services/BrandService";
import type { Brand } from "../types/Brand";


interface BrandState{
    brands:Brand[];
    loading:boolean;
    error:string | null;
}

const initialState:BrandState={
 brands:[],
 loading:false,
 error:null
}

//Thunk para obtener marcas
export const getBrands=createAsyncThunk("brands/fetch",async()=>{
    return await fetchBrands();
})



const brandSlice=createSlice({
name:'brandsSlice',
initialState,
reducers:{},
extraReducers(builder) {
    builder
    .addCase(getBrands.pending,(state)=>{
        state.loading=true;
        state.error=null;
    })
    .addCase(getBrands.fulfilled,(state,action)=>{
       state.loading=false;
       state.brands=action.payload;
    })
    .addCase(getBrands.rejected,(state,action)=>{
state.loading=true;
        state.error=action.error.message ?? "Error al cargar marcas" ;
    });
},
});

export default brandSlice.reducer;