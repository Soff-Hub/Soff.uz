import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Boshlang'ich holat
const initialState = {
    wishlistItems: [],
    compareItems: [],
    cartItems: [],
    cartDataItems: [],
    wishlist: [],
    replied_count: 0,
    profile: null,
    status: 'idle',
    error: null,
};

// Asenkron funksiyalar (thunks)
export const getWishlistItems = createAsyncThunk(
    'ecommerce/getWishlistItems',
    async (payload, { rejectWithValue }) => {
        try {
            return payload;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const getCartItems = createAsyncThunk(
    'ecommerce/getCartItems',
    async (payload, { rejectWithValue }) => {
        try {
            localStorage.setItem('cart', JSON.stringify(payload));
            return payload;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const getCompareItems = createAsyncThunk(
    'ecommerce/getCompareItems',
    async (payload, { rejectWithValue }) => {
        try {
            return payload;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const getCartDataItems = createAsyncThunk(
    'ecommerce/getCartDataItems',
    async (payload, { rejectWithValue }) => {
        try {
            const localData = payload.map((item) => item.id);
            localStorage.setItem('cart', JSON.stringify(localData));
            return payload;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const getCartItemDataItems = createAsyncThunk(
    'ecommerce/getCartItemDataItems',
    async (payload, { rejectWithValue }) => {
        try {
            const localData = JSON.parse(localStorage.getItem('cart')) || [];
            localStorage.setItem(
                'cart',
                JSON.stringify([...localData, payload[0].id])
            );
            return payload;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const getSavedItems = createAsyncThunk(
    'ecommerce/getSavedItems',
    async (payload, { rejectWithValue }) => {
        try {
            const localData = payload.map((item) => item.id);
            localStorage.setItem('wishlist', JSON.stringify(localData));
            return payload;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const getSavedItem = createAsyncThunk(
    'ecommerce/getSavedItem',
    async (payload, { rejectWithValue }) => {
        try {
            const localData =
                JSON.parse(localStorage.getItem('wishlist')) || [];
            localStorage.setItem(
                'wishlist',
                JSON.stringify([...localData, payload[0].id])
            );
            return payload;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const ecommerceSlice = createSlice({
    name: 'ecommerce',
    initialState,
    reducers: {
        setRepliedCount: (state, action) => {
            state.replied_count = action.payload;
        },
        setSavedPrfileData: (state, action) => {
            state.profile = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getWishlistItems.fulfilled, (state, action) => {
                action.payload.forEach((item) => {
                    if (!state.wishlistItems.find((el) => el.id === item.id)) {
                        state.wishlistItems.push(item);
                    }
                });
            })
            .addCase(getCartItems.fulfilled, (state, action) => {
                state.cartItems = action.payload;
            })
            .addCase(getCompareItems.fulfilled, (state, action) => {
                state.compareItems = action.payload;
            })
            .addCase(getCartDataItems.fulfilled, (state, action) => {
                state.cartDataItems = action.payload;
            })
            .addCase(getCartItemDataItems.fulfilled, (state, action) => {
                state.cartDataItems.push(...action.payload);
            })
            .addCase(getSavedItems.fulfilled, (state, action) => {
                state.wishlist = action.payload;
            })
            .addCase(getSavedItem.fulfilled, (state, action) => {
                state.wishlist.push(...action.payload);
            });
    },
});

// Reducer va actionlarni eksport qilish
export const { setRepliedCount, setSavedPrfileData } = ecommerceSlice.actions;
export default ecommerceSlice.reducer;
