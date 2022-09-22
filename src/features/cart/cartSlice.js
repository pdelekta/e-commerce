import { createSlice } from "@reduxjs/toolkit";

const initialCart = [];
export const cartSlice = createSlice({
    name: "cart",
    initialState: initialCart,
    reducers: {
        addItem: (state, action) => {
            if (action.payload.quantity === 0) return state;

            if (state.find(item => item.product.id === action.payload.product.id)) {
                state.forEach(item => {
                    if (item.product.id === action.payload.product.id) {
                        item.quantity += action.payload.quantity;
                    }
                });
                return state;
            }

            return [
                ...state,
                {
                    product: action.payload.product,
                    quantity: action.payload.quantity,
                },
            ];
        },
        removeItem: (state, action) => state.filter(item => item.product.id !== action.payload),
        // updateQuantity: (state, action) => {
        //     state.find(item => item.product.id === action.payload.id).quantity =
        //         action.payload.quantity;
        // },
    },
});

export default cartSlice.reducer;

// Action creators

export const { addItem, removeItem } = cartSlice.actions;

// Selectors

export const selectCart = state => state.cart;

export const selectCartItemSum = state =>
    state.cart.reduce((acc, value) => {
        return acc + value.quantity;
    }, 0);

export const selectCartItemsTotal = state =>
    state.cart.reduce((acc, value) => {
        return acc + value.product.price * value.quantity;
    }, 0);
