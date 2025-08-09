import { configureStore } from "@reduxjs/toolkit";
import productReducer from '../features/products/store/productSlice';
import brandReducer from '../features/brands/store/brandSlice';
import categoryReducer from '../features/categories/store/CategorySlice';
import orderReducer from '../adminClient/orders/store/OrderSlice';

export const store=configureStore({
    reducer:{
        products:productReducer,
        brandsReducer:brandReducer,
        categories:categoryReducer,
        orders:orderReducer,
    }
});

export type RootState=ReturnType<typeof store.getState>;
export type AppDispatch=typeof store.dispatch;