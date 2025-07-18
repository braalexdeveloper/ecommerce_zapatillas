import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Category } from "../types/Category";
import { fetchCategories } from "../services/CategoryService";


interface CategoryState {
    categories: Category[];
    loading: boolean;
    error: string | null;
}

const initialState: CategoryState = {
    categories: [],
    loading: true,
    error: null
}

export const getCategories = createAsyncThunk("categories/fetch", async () => {
    return await fetchCategories();
});

const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getCategories.pending, (state) => {
            state.loading = true;
        })
            .addCase(getCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(getCategories.rejected, (state, action) => {
                state.error = action.error.message ?? "Erro al cargar categorias";
                state.loading = false;
            })
    }
});

export default categorySlice.reducer;

