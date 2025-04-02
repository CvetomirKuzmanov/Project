import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_APP_SERVER_URL}/data/products`

export const fetchProductList = createAsyncThunk(
    'products/fetchProductList',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchAverageRating = createAsyncThunk(
    'products/fetchAverageRating',
    async (itemId, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL}/ratings/getAverageRating`, { itemId });
            if (response.data.success) {
                return { itemId, rating: response.data.data.averageRating };
            }
            return { itemId, rating: 0 };
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateRating = createAsyncThunk(
    'products/updateRating',
    async ({ itemId, rating, token }, { rejectWithValue }) => {
        try {
            await axios.post(`${BASE_URL}/ratings/updateRating`, {
                itemId,
                rating
            }, {
                headers: { 'X-Authorization': token }
            });
            return { itemId, rating };
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const productSlice = createSlice({
    name: 'products',
    initialState: {
        items: [],
        ratings: {},
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductList.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchProductList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchAverageRating.fulfilled, (state, action) => {
                state.ratings[action.payload.itemId] = action.payload.rating;
            })
            .addCase(updateRating.fulfilled, (state, action) => {
                state.ratings[action.payload.itemId] = action.payload.rating;
            });
    }
});

export default productSlice.reducer; 