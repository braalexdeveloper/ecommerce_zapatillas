import { configureStore } from "@reduxjs/toolkit";
import productReducer from '../features/products/store/productSlice';
import brandReducer from '../features/brands/store/brandSlice';
import categoryReducer from '../features/categories/store/CategorySlice';

export const store=configureStore({
    reducer:{
        products:productReducer,
        brandsReducer:brandReducer,
        categories:categoryReducer,
    }
});

export type RootState=ReturnType<typeof store.getState>;
export type AppDispatch=typeof store.dispatch;