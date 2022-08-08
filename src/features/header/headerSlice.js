import { createSlice } from "@reduxjs/toolkit";

const initialheader = {
    isCartOpen: false,
};
const headerSlice = createSlice({
    name: "header",
    initialState: initialheader,
    reducers: {
        toggleCartOpen: (state, action) => {
            if (action.payload) state.isCartOpen = action.payload;
            else state.isCartOpen = !state.isCartOpen;
        },
    },
});

export default headerSlice.reducer;

// Action creators

export const { toggleCartOpen } = headerSlice.actions;

// Selectors

export const selectIsCartOpen = state => {
    return state.header.isCartOpen;
};
