import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialProducts = {
    entities: [],
    isLoading: false,
    error: "",
};

export const fetchProductById = createAsyncThunk("products/loadProduct", async id => {
    const response = await fetch(`https://62ecca7855d2bd170e86e852.mockapi.io/api/v1/products/${id}`);
    const json = await response.json();
    return json;
});

export const fetchProducts = createAsyncThunk("products/loadProducts", async () => {
    const response = await fetch(`https://62ecca7855d2bd170e86e852.mockapi.io/api/v1/products`);
    const json = await response.json();
    return json;
});

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
            state.isLoading = false;
            state.error = "";
            state.entities.forEach(product => {
                if (product.id === parseInt(action.payload.id)) return state;
            });
            state.entities.push(action.payload);
        },
        [fetchProductById.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
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
            state.error = action.error.message;
        },
    },
});

export default productsSlice.reducer;

// Action creators

export const { addProduct } = productsSlice.actions;

// Selectors

export const selectProduct = (state, id) => {
    return state.products.entities.find(product => parseInt(product.id) === id);
};

export const selectAllProducts = state => state.products.entities;

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
