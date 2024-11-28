import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setCookie } from 'nookies';

// Boshlang'ich holat
const initialState = {
    isLoggedIn: false,
    user: null,
    accountLinks: [],
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
};

// Asenkron funksiyalarni yaratish
export const login = createAsyncThunk(
    'auth/login',
    async ({ user, data }, { rejectWithValue }) => {
        try {
            // API chaqiruv
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem(
                'data',
                JSON.stringify({ ...data, password: null })
            );
            setCookie(null, 'token', user?.access, {
                maxAge: 30 * 24 * 60 * 60,
                path: '/',
            });
            return { user, data: { ...data, password: null } };
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
            if (user?.access) {
                return { isLoggedIn: true, user };
            } else {
                return { isLoggedIn: false, user: null };
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
                state.data = {};
            })
            .addCase(checkAuthorization.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn;
                state.user = action.payload.user;
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
