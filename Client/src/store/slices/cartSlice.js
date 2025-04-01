import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "../../utils/request";
import useAuth from "../../hooks/useAuth";

const BASE_URL = `${import.meta.env.VITE_APP_SERVER_URL}/data/cart`;

export const addToCart = createAsyncThunk(
    "cart/add",
    async ({ _id, token }, { rejectWithValue }) => {
        try {
            console.log("Making add to cart request:", {
                _id,
                url: BASE_URL,
            });
            const response = await request.post(
                BASE_URL,
                { productId: _id },
                token ? { headers: { "X-Authorization": token } } : undefined
            );
            console.log("Add to cart response:", response);
            return response;
        } catch (error) {
            console.error("Add to cart error:", error);
            return rejectWithValue(
                error.response?.data || "Failed to add to cart"
            );
        }
    }
);

export const removeFromCart = createAsyncThunk(
    "cart/remove",
    async ({ _id, token }, { rejectWithValue }) => {
        try {
            console.log("Making remove from cart request:", {
                _id,
                url: `${BASE_URL}/${_id}`,
            });
            const response = await request.delete(
                `${BASE_URL}/${_id}`,
                null,
                token ? { headers: { "X-Authorization": token } } : undefined
            );

            console.log("Remove from cart response:", response);
            return response;
        } catch (error) {
            console.error("Remove from cart error:", error);
            return rejectWithValue(
                error.response?.data || "Failed to remove from cart"
            );
        }
    }
);

export const loadCartData = createAsyncThunk(
    "cart/loadCartData",
    async (token, { rejectWithValue }) => {
        try {
            const response = await request.get(
                BASE_URL,
                null,
                token ? { headers: { "X-Authorization": token } } : undefined
            );
            return response;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || "Failed to load cart"
            );
        }
    }
);

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: {},
        loading: false,
        error: null,
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
                const item = action.payload;
                if (item && item._id) {
                    state.items[item._id] = (state.items[item._id] || 0) + 1;
                }
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
                const _id = action.payload;
                if (state.items[_id] > 0) {
                    state.items[_id] -= 1;
                }
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
                if (Array.isArray(action.payload)) {
                    state.items = action.payload.reduce((acc, item) => {
                        acc[item.productId] = (acc[item.productId] || 0) + 1;
                        return acc;
                    }, {});
                } else {
                    state.items = action.payload || {};
                }
            })
            .addCase(loadCartData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default cartSlice.reducer;
