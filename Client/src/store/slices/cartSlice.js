import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request from '../../utils/request';

const BASE_URL = 'http://localhost:3030/data/products';

export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async ({ name, token }, { rejectWithValue }) => {
        try {
            console.log('Making add to cart request:', { name, token, url: `${BASE_URL}/cart/add` });
            if (token) {
                const response = await request.post(`${BASE_URL}/cart/add`, { name });
                console.log('Add to cart response:', response);
                return name;
            }
        } catch (error) {
            console.error('Add to cart error:', error);
            return rejectWithValue(error.response?.data || 'Failed to add to cart');
        }
    }
);

export const removeFromCart = createAsyncThunk(
    'cart/removeFromCart',
    async ({ name, token }, { rejectWithValue }) => {
        try {
            console.log('Making remove from cart request:', { name, token, url: `${BASE_URL}/cart/remove` });
            if (token) {
                const response = await request.post(`${BASE_URL}/cart/remove`, { name });
                console.log('Remove from cart response:', response);
                return name;
            }
        } catch (error) {
            console.error('Remove from cart error:', error);
            return rejectWithValue(error.response?.data || 'Failed to remove from cart');
        }
    }
);

export const loadCartData = createAsyncThunk(
    'cart/loadCartData',
    async (token, { rejectWithValue }) => {
        try {
            console.log('Making load cart request:', { token, url: `${BASE_URL}/cart/get` });
            const response = await request.get(`${BASE_URL}/cart/get`);
            console.log('Load cart response:', response);
            return response;
        } catch (error) {
            console.error('Load cart error:', error);
            return rejectWithValue(error.response?.data || 'Failed to load cart');
        }
    }
);

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: {},
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addToCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.loading = false;
                const name = action.payload;
                state.items[name] = (state.items[name] || 0) + 1;
                console.log('Cart state after adding:', state.items);
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(removeFromCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.loading = false;
                const name = action.payload;
                if (state.items[name] > 0) {
                    state.items[name] -= 1;
                }
                console.log('Cart state after removing:', state.items);
            })
            .addCase(removeFromCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(loadCartData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadCartData.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
                console.log('Cart state after loading:', state.items);
            })
            .addCase(loadCartData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default cartSlice.reducer; 