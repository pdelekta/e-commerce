import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import { fetchAPI } from "../../api/api";

const initialProducts = {
    entities: [],
    isLoading: false,
    error: "",
};

// Async Action Creators

export const fetchProductById = createAsyncThunk("products/loadProduct", fetchAPI);

export const fetchProducts = createAsyncThunk("products/loadProducts", fetchAPI);

export const productsSlice = createSlice({
    name: "products",
    initialState: initialProducts,
    reducers: {
        addProduct: (state, action) => [...state, action.payload],
    },
    extraReducers: {
        [fetchProductById.pending]: state => {
            state.isLoading = true;
            state.error = "";
        },
        [fetchProductById.fulfilled]: (state, action) => {
            let isAlreadyInState = false;
            state.isLoading = false;
            state.error = "";
            state.entities.forEach((product, index) => {
                if (parseInt(product.id) === parseInt(action.payload.id)) {
                    state.entities[index] = action.payload;
                    isAlreadyInState = true;
                }
            });
            if (!isAlreadyInState) state.entities.push(action.payload);
        },
        [fetchProductById.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        },
        [fetchProducts.pending]: state => {
            state.isLoading = true;
            state.error = "";
        },
        [fetchProducts.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.error = "";
            state.entities = action.payload;
        },
        [fetchProducts.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        },
    },
});

export default productsSlice.reducer;

// Action creators

export const { addProduct } = productsSlice.actions;

// Selectors

export const selectAllProducts = state => state.products.entities;

export const selectProduct = (state, id) => {
    return state.products.entities.find(product => parseInt(product.id) === id);
};

export const selectProductImages = (state, id) => {
    return state.products.entities.find(product => parseInt(product.id) === id)?.images;
};

export const selectIsProductById = (state, id) => {
    return state.products.entities.some(product => parseInt(product.id) === id);
};

export const selectIsProductsLoading = state => {
    return state.products.isLoading;
};

export const selectProductsError = state => state.products.error;

export const selectProductsByCategory = createSelector(
    [selectAllProducts, (state, category) => category, selectIsProductsLoading],
    (products, category, isProductsLoading) => {
        if (!isProductsLoading) {
            return products.filter(product => product.category === category);
        }
    }
);
