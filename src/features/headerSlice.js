import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
    items: [
        {id: 1, label: 'Home', link: '/'},
        {id: 2, label: 'Products', link: '/products'},
        {id: 3, label: 'Sign-Up', link: '/signup'},
    ],
};

const headerSlice = createSlice({
    name: 'header',
    initialState, 
    reducers: {
        addItem: (state, action) => {
            state.items.push(action.payload);
        },
        removeItem: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        updateItem: (state, action) => {
            const { id, label, link } = action.payload;
            const itemIndex = state.items.findIndex(item => item.id === id);
            if (itemIndex !== -1) {
                state.items[itemIndex].label = label;
                state.items[itemIndex].link = link;
            }
        },
    },
});

export const { addItem, removeItem, updateItem } = headerSlice.actions;

export default headerSlice.reducer;
