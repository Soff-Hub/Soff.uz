import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '~/repositories/Repository';
import api from '~/shared/api/api';
import { safeLocalStorage } from '~/shared/utilities/safe-local-storage';

export interface EcommerceState {
    cartDataItems: any[];
    wishlist: any[];
    status: string;
    error: string | null;
}

const initialState: EcommerceState = {
    cartDataItems: [],
    wishlist: [],
    status: 'loading',
    error: null,
};

export const setWishlistItems = createAsyncThunk(
    'ecommerce/setWishlistItems',
    async (payload, { rejectWithValue }) => {
        try {
            return payload;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const initLocalCart = createAsyncThunk(
    'ecommerce/initLocalCart',
    async (payload, { rejectWithValue }) => {
        const localWishlist = safeLocalStorage.getItem('wishlist');
        const localCart = safeLocalStorage.getItem('cart');

        const parsedWishlist = localWishlist ? JSON.parse(localWishlist) : [];
        const parsedCartList = localCart ? JSON.parse(localCart) : [];

        if (parsedWishlist.length || parsedCartList.length) {
            try {
                const resp = await api.post(
                    baseUrl + 'customer/documents-list/',
                    {
                        documents: [...parsedWishlist, ...parsedCartList],
                    }
                );
                return {
                    wishlist: parsedWishlist.map(
                        (_el: any, i: number) => resp.data?.data?.[i]
                    ),
                    cart: parsedCartList.map(
                        (_el: any, i: number) =>
                            resp.data?.data?.[parsedWishlist.length + i]
                    ),
                };
            } catch (error) {
                return {
                    wishlist: [],
                    cart: [],
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
            safeLocalStorage.setItem('cart', JSON.stringify(payload));
            return payload;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

const ecommerceSlice = createSlice({
    name: 'ecommerce',
    initialState,
    reducers: {
        setCartDataItems: (state, action) => {
            const localData = action.payload.map((item: any) => item.id);
            safeLocalStorage.setItem('cart', JSON.stringify(localData));
            state.cartDataItems = action.payload;
        },
        setCartItemDataItems: (state, action) => {
            const localCart = safeLocalStorage.getItem('cart');
            const parsedCart = localCart ? JSON.parse(localCart) : [];

            safeLocalStorage.setItem(
                'cart',
                JSON.stringify([...parsedCart, action.payload[0].id])
            );

            state.cartDataItems.push(action.payload[0]);
        },
        setSaved: (state, action) => {
            const localData = action.payload.map((item: any) => item.id);
            safeLocalStorage.setItem('wishlist', JSON.stringify(localData));
            state.wishlist = action.payload;
        },
        setSavedItem: (state, action) => {
            const localWishlist = safeLocalStorage.getItem('wishlist');
            const parsedWishlist = localWishlist
                ? JSON.parse(localWishlist)
                : [];

            safeLocalStorage.setItem(
                'wishlist',
                JSON.stringify([...parsedWishlist, action.payload[0].id])
            );
            state.wishlist.push(action.payload[0]);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(setWishlistItems.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(setWishlistItems.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            .addCase(setCartItems.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(setCartItems.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            .addCase(initLocalCart.fulfilled, (state, action) => {
                state.wishlist = action.payload.wishlist;
                state.cartDataItems = action.payload.cart;
                state.status = 'idle';
            });
    },
});

export const {
    setCartDataItems,
    setCartItemDataItems,
    setSaved,
    setSavedItem,
} = ecommerceSlice.actions;

export default ecommerceSlice.reducer;
