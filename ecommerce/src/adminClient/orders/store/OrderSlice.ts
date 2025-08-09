import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getOrdersByClient } from "../service/OrderService";


interface OrderState{
    orders:any;
    loading:boolean;
    error:string | null;
}

const initialState:OrderState={
orders:[],
loading:true,
error:null
}

export const ordersByClient=createAsyncThunk('orders/fetch',async(id:number)=>{
return await getOrdersByClient(id);
});

const ordersSlice=createSlice({
    name:'orders',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(ordersByClient.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(ordersByClient.fulfilled,(state,action)=>{
           state.loading=false;
           state.orders=action.payload;
        })
        .addCase(ordersByClient.rejected,(state,action)=>{
            state.loading=false;
           state.orders=[];
           state.error=action.payload as string;
        });
    }
});

export default ordersSlice.reducer;

