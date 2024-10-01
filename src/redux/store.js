import { configureStore } from "@reduxjs/toolkit";
import headerReducer from '../features/headerSlice';

export const store = configureStore({
    reducer: {
        header: headerReducer,
    },
});

export default store;
