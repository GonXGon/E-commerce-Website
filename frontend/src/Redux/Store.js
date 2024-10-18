import { configureStore } from "@reduxjs/toolkit";
import headerReducer from '../Features/headerSlice';
import cartReducer from '../Features/cartSlice';

export const store = configureStore({
    reducer: {
        header: headerReducer,
        cart: cartReducer,
    },
});

export default store;