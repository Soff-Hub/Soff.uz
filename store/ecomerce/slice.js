import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '~/repositories/Repository';
import api from '~/shared/api/api';

// Boshlang'ich holat
const initialState = {
    wishlistItems: [],
    compareItems: [],
    cartItems: [],
    cartDataItems: [],
    wishlist: [],
    replied_count: 0,
    profile: null,
    status: 'loading',
    error: null,
};

// Asenkron thunk funksiyalari
export const setWishlistItems = createAsyncThunk(
    'ecommerce/setWishlistItems',
    async (payload, { rejectWithValue }) => {
        try {
            // Bu yerda API chaqiruvi yoki boshqa logika bo'lishi mumkin
            return payload; // Thunk orqali qaytariladi
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const initLocalCart = createAsyncThunk(
    'ecommerce/initLocalCart',
    async (payload, { rejectWithValue }) => {
        const wishL = JSON.parse(localStorage.getItem('wishlist')) || [];
        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        if (wishL.length > 0 || cart.length > 0) {
            try {
                const resp = await api.post(
                    baseUrl + 'customer/documents-list/',
                    {
                        documents: [...wishL, ...cart],
                    }
                );
                return {
                    wishlist: wishL.map((el, i) => resp.data?.data?.[i]),
                    cart: cart.map(
                        (el, i) => resp.data?.data?.[wishL.length + i]
                    ),
                };
            } catch (error) {
                return {
                    wishlist: wishL.map((el, i) => resp.data?.data?.[i]),
                    cart: cart.map(
                        (el, i) => resp.data?.data?.[wishL.length + i]
                    ),
                };
            }
        } else {
            return {
                wishlist: [],
                cart: [],
            };
        }
    }
);

export const setCartItems = createAsyncThunk(
    'ecommerce/setCartItems',
    async (payload, { rejectWithValue }) => {
        try {
            localStorage.setItem('cart', JSON.stringify(payload));
            return payload;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Slice yaratish
const ecommerceSlice = createSlice({
    name: 'ecommerce',
    initialState,
    reducers: {
        setCompareItems: (state, action) => {
            state.compareItems = action.payload;
        },
        setCartDataItems: (state, action) => {
            const localData = action.payload.map(item => item.id);
            localStorage.setItem('cart', JSON.stringify(localData));
            state.cartDataItems = action.payload;
        },
        setCartItemDataItems: (state, action) => {
            const localData = JSON.parse(localStorage.getItem('cart')) || [];
            localStorage.setItem(
                'cart',
                JSON.stringify([...localData, action.payload[0].id])
            );
            state.cartDataItems.push(action.payload[0]);
        },
        setSaved: (state, action) => {
            const localData = action.payload.map(item => item.id);
            localStorage.setItem('wishlist', JSON.stringify(localData));
            state.wishlist = action.payload;
        },
        setSavedItem: (state, action) => {
            const localData =
                JSON.parse(localStorage.getItem('wishlist')) || [];
            localStorage.setItem(
                'wishlist',
                JSON.stringify([...localData, action.payload[0].id])
            );
            state.wishlist.push(action.payload[0]);
        },
        setRepliedCount: (state, action) => {
            state.replied_count = action.payload;
        },
        setSavedPrfileData: (state, action) => {
            state.profile = action.payload;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(setWishlistItems.pending, state => {
                state.status = 'loading';
            })
            .addCase(setWishlistItems.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.wishlistItems = action.payload;
            })
            .addCase(setWishlistItems.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(setCartItems.pending, state => {
                state.status = 'loading';
            })
            .addCase(setCartItems.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.cartItems = action.payload;
            })
            .addCase(setCartItems.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(initLocalCart.fulfilled, (state, action) => {
                state.wishlist = action.payload.wishlist;
                state.cartDataItems = action.payload.cart;
                state.status = 'idle';
            });
    },
});

// Actionlarni eksport qilish
export const {
    setCompareItems,
    setCartDataItems,
    setCartItemDataItems,
    setSaved,
    setSavedItem,
    setRepliedCount,
    setSavedPrfileData,
} = ecommerceSlice.actions;

// Reducerni eksport qilish
export default ecommerceSlice.reducer;
