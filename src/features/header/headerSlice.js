import { createSlice } from "@reduxjs/toolkit";

const initialheader = {
    isCartOpen: false,
    isMenuOpen: false,
};
const headerSlice = createSlice({
    name: "header",
    initialState: initialheader,
    reducers: {
        toggleCartOpen: (state, action) => {
            if (action.payload === false || action.payload === true) state.isCartOpen = action.payload;
            else state.isCartOpen = !state.isCartOpen;
        },
        setMenuOpen: (state, action) => {
            state.isMenuOpen = action.payload;
        },
    },
});

export default headerSlice.reducer;

// Action creators

export const { toggleCartOpen, setMenuOpen } = headerSlice.actions;

// Selectors

export const selectIsCartOpen = state => {
    return state.header.isCartOpen;
};

export const selectIsMenuOpen = state => {
    return state.header.isMenuOpen;
};
