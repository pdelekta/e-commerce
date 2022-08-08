import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialProducts = {
    allProducts: [],
    isLoading: false,
    hasError: false,
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
            state.hasError = false;
        },
        [fetchProductById.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.hasError = false;
            state.allProducts.forEach(product => {
                if (product.id === parseInt(action.payload.id)) return state;
            });
            state.allProducts.push(action.payload);
        },
        [fetchProductById.rejected]: state => {
            state.isLoading = false;
            state.hasError = true;
        },
        [fetchProducts.pending]: state => {
            state.isLoading = true;
            state.hasError = false;
        },
        [fetchProducts.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.hasError = false;
            state.allProducts = action.payload;
        },
        [fetchProducts.rejected]: state => {
            state.isLoading = false;
            state.hasError = true;
        },
    },
});

export default productsSlice.reducer;

// Action creators

export const { addProduct } = productsSlice.actions;

// Selectors

export const selectProduct = (state, id) => {
    return state.products.allProducts.find(product => parseInt(product.id) === id);
};

export const selectProductImages = (state, id) => {
    return state.products.allProducts.find(product => parseInt(product.id) === id)?.images;
};

export const selectIsProductById = (state, id) => {
    // debugger;
    return state.products.allProducts.some(product => parseInt(product.id) === id);
};

export const selectIsProductsLoading = state => state.products.isLoading;

export const selectHasProductsError = state => state.products.hasError;
