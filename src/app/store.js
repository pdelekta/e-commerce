import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import productsReducer from "../features/products/productsSlice";
import headerReducer from "../features/header/headerSlice";

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        products: productsReducer,
        header: headerReducer,
    },
});
