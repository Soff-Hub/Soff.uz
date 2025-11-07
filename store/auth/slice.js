import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

// Boshlang'ich holat
const initialState = {
    isLoggedIn: false,
    user: null,
    accountLinks: [
        {
            text: 'Sotib olinganlar',
            url: '/account/sellerproducts',
            icon: 'fa-solid fa-bag-shopping',
        },
        {
            text: 'Buyurtmalarim',
            url: '/order/my-orders',
            icon: 'fas fa-truck',
        },
    ],
    data: {},
    products: {},
    shop: [],
    category_lists: [],
    top_category_lists: [],
    category: true,
    categorySlug: [],
    id: null,
    status: 'idle',
    error: null,
    telegramWebApp: false,
};

// Asenkron funksiyalarni yaratish
export const login = createAsyncThunk(
    'auth/login',
    async ({ user, data }, { rejectWithValue }) => {
        try {
            // API chaqiruv
            localStorage.setItem('user', JSON.stringify(user));
            Cookies.set('token', user?.access, {
                expires: jwtDecode(user?.access)?.exp || 8,
            });
            localStorage.setItem(
                'data',
                JSON.stringify({ ...data, password: null })
            );
            return {
                user,
                data: { ...data, password: null },
                status: 'succeeded',
            };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const logOut = createAsyncThunk(
    'auth/logOut',
    async (_, { rejectWithValue }) => {
        try {
            // API chaqiruv
            localStorage.clear();
            Cookies.remove('token');
            return;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const checkAuthorization = createAsyncThunk(
    'auth/checkAuthorization',
    async (_, { rejectWithValue }) => {
        try {
            const user = localStorage.getItem('user')
                ? JSON.parse(localStorage.getItem('user'))
                : '';
            const token = Cookies.get('token');
            if (!token)
                Cookies.set('token', user?.access, {
                    expires: jwtDecode(user?.access)?.exp || 8,
                });
            if (user?.access) {
                return { isLoggedIn: true, user, status: 'succeeded' };
            } else {
                return { isLoggedIn: false, user: null, status: 'failed' };
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAccountLinks: (state, action) => {
            state.accountLinks = action.payload;
        },
        setMyProducts: (state, action) => {
            state.products = action.payload;
        },
        setOneShopDoc: (state, action) => {
            state.shop = action.payload;
        },
        setCategoryLists: (state, action) => {
            state.category_lists = action.payload;
        },
        setTopCategoryLists: (state, action) => {
            state.top_category_lists = action.payload;
        },
        setCategory: (state, action) => {
            state.category = action.payload;
        },
        setCategorySlug: (state, action) => {
            state.categorySlug = action.payload;
        },
        begin: (state, action) => {
            state.id = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.isLoggedIn = true;
                state.user = action.payload.user;
                state.data = action.payload.data;
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(logOut.fulfilled, (state) => {
                state.isLoggedIn = false;
                state.user = null;
                state.status = 'idle';
                state.data = {};
            })
            .addCase(checkAuthorization.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(checkAuthorization.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn;
                state.user = action.payload.user;
                state.status = action.payload.status;
            });
    },
});

// Reducer va actionlarni eksport qilish
export const {
    setAccountLinks,
    setMyProducts,
    setOneShopDoc,
    setCategoryLists,
    setTopCategoryLists,
    setCategory,
    setCategorySlug,
    begin,
} = authSlice.actions;

export default authSlice.reducer;
