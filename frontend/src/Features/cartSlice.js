import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, { getState }) => {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}cart`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Error fetching cart');
        }

        const data = await response.json();
        return data; // Return the parsed JSON data from the response
    } catch (error) {
        console.error('Error fetching cart:', error);
        throw error; // Rethrow the error so it can be handled by createAsyncThunk
    }
});

const initialState = {
    items: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addtoCart: (state, action) => {
            const itemIndex = state.items.findIndex((item) => item.productId === action.payload.productId);
            if (itemIndex >= 0) {
                state.items[itemIndex].quantity += action.payload.quantity;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
        },
        removeCart: (state, action) => {
            state.items = state.items.filter((item) => item.productId !== action.payload);
        },
        updateCartQuantity: (state, action) => {
            const { productId, quantity } = action.payload;
            const item = state.items.find((item) => item.productId === productId);
            if (item) {
                item.quantity = quantity;
            }
        },
        clearCart: (state) => {
            state.items = [];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCart.fulfilled, (state, action) => {
            state.items = action.payload.items.map(item => ({
                ...item,
                productId: item.productId._id || item.productId
            }));
            state.total = action.payload.total;
        });
    },
});

export const { addtoCart, removeCart, updateCartQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
