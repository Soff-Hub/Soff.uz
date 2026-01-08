import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

export interface AuthState {
    isLoggedIn: boolean;
    user: any;
    accountLinks: Array<{ text: string; url: string; icon: string }>;
    data: any;
    id: number | null;
    status: string;
    error: string | null;
}

// Boshlang'ich holat
const initialState: AuthState = {
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
    id: null,
    status: 'idle',
    error: null,
};

// Asenkron funksiyalarni yaratish
export const login = createAsyncThunk(
    'auth/login',
    async ({ user, data }: any, { rejectWithValue }) => {
        try {
            // API chaqiruv
            localStorage.setItem('user', JSON.stringify(user));
            Cookies.set('token', user?.access, {
                expires: jwtDecode(user?.access)?.exp || 8,
            });
            // Store data in localStorage for backward compatibility, but not in Redux state
            if (data) {
                localStorage.setItem('data', JSON.stringify(data));
            }
            return {
                user,
                data: data ? data : {},
                status: 'succeeded',
            };
        } catch (error: any) {
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
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const checkAuthorization = createAsyncThunk(
    'auth/checkAuthorization',
    async (_, { rejectWithValue }) => {
        try {
            let user: any = localStorage.getItem('user');
            user = user ? JSON.parse(user) : '';
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
        } catch (error: any) {
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
                state.data = action.payload.data || {};
            })
            .addCase(login.rejected, (state, action: any) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(logOut.fulfilled, (state) => {
                state.isLoggedIn = false;
                state.user = null;
                state.data = {};
                state.status = 'idle';
            })
            .addCase(checkAuthorization.rejected, (state, action: any) => {
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
export const { setAccountLinks, begin } = authSlice.actions;

export default authSlice.reducer;
