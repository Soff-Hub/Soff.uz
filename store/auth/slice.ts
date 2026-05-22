import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import { safeLocalStorage } from '~/shared/utilities/safe-local-storage';
import {
    clearAuthStorage,
    getJwtCookieExpires,
} from '~/shared/utilities/auth-session';

export interface AuthState {
    isLoggedIn: boolean;
    user: any;
    status: string;
    error: string | null;
}

const initialState: AuthState = {
    isLoggedIn: false,
    user: null,
    status: 'idle',
    error: null,
};

export const login = createAsyncThunk(
    'auth/login',
    async ({ user, data }: any, { rejectWithValue }) => {
        try {
            safeLocalStorage.setItem('user', JSON.stringify(user));
            Cookies.set('token', user?.access, {
                expires: getJwtCookieExpires(user?.access),
            });
            if (data) {
                safeLocalStorage.setItem('data', JSON.stringify(data));
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
            clearAuthStorage();
            
            if (typeof window !== 'undefined') {
                window.location.href = '/auth/login';
            }
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
            let user: any = safeLocalStorage.getItem('user');
            user = user ? JSON.parse(user) : '';
            const decodedToken: any = user?.access ? jwtDecode(user.access) : null;
            const isExpired =
                decodedToken?.exp && decodedToken.exp * 1000 <= Date.now();

            if (isExpired) {
                clearAuthStorage();
                return { isLoggedIn: false, user: null, status: 'failed' };
            }

            const token = Cookies.get('token');
            if (!token && user?.access) {
                Cookies.set('token', user?.access, {
                    expires: getJwtCookieExpires(user?.access),
                });
            }
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
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.isLoggedIn = true;
                state.user = action.payload.user;
            })
            .addCase(login.rejected, (state, action: any) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(logOut.fulfilled, (state) => {
                state.isLoggedIn = false;
                state.user = null;
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

export default authSlice.reducer;
