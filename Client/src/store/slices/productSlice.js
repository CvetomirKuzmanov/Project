import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_APP_SERVER_URL}/data/products`;

export const fetchProductList = createAsyncThunk(
    "products/fetchProductList",
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
    "products/fetchAverageRating",
    async (itemId, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${BASE_URL}/ratings/getAverageRating`,
                { itemId }
            );
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
    "products/updateRating",
    async ({ itemId, rating, token }, { rejectWithValue }) => {
        try {
            await axios.post(
                `${BASE_URL}/ratings/updateRating`,
                {
                    itemId,
                    rating,
                },
                {
                    headers: { "X-Authorization": token },
                }
            );
            return { itemId, rating };
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
export const createCart = createAsyncThunk(
    "cart/create",
    async ({ cartData, token, userId }, { rejectWithValue }) => {
        try {
            const response = await request.post(
                `${BASE_URL}/${userId}/cart`,
                cartData,
                token ? { headers: { "X-Authorization": token } } : undefined
            );
            return response;
        } catch (error) {
            console.error("Create cart error:", error);
            return rejectWithValue(
                error.response?.data || "Failed to create cart"
            );
        }
    }
);

export const useCreateCart = () => {
    const dispatch = useDispatch();
    const { accessToken, userId } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const create = async (cartData) => {
        setLoading(true);
        try {
            const resultAction = await dispatch(
                createCart({
                    cartData,
                    token: accessToken,
                    userId,
                })
            );

            if (createCart.fulfilled.match(resultAction)) {
                setLoading(false);
                toast.success("Cart created successfully");
                return resultAction.payload;
            } else {
                const errorMessage =
                    resultAction.payload || "Failed to create cart";
                setError(errorMessage);
                toast.error(errorMessage);
                setLoading(false);
                throw new Error(errorMessage);
            }
        } catch (err) {
            const errorMessage = err.message || "Failed to create cart";
            setError(errorMessage);
            setLoading(false);
            throw err;
        }
    };

    return { create, loading, error };
};
const productSlice = createSlice({
    name: "products",
    initialState: {
        items: [],
        ratings: {},
        loading: false,
        error: null,
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
            })
            .addCase(createCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default productSlice.reducer;
