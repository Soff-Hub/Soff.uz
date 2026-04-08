import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { safeLocalStorage } from '~/shared/utilities/safe-local-storage';

// Simple function to parse JWT without library
const parseJwt = (token: string) => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
};

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
            const decoded = parseJwt(user?.access);
            Cookies.set('token', user?.access, {
                expires: (decoded?.exp ? new Date(decoded.exp * 1000) : 8) as any,
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
            safeLocalStorage.removeItem('user');
            safeLocalStorage.removeItem('data');
            // Using / path for cookie to ensure same-origin apps can see the change
            Cookies.remove('token', { path: '/' });
            
            if (typeof window !== 'undefined') {
                window.location.href = 'https://soff.uz/auth/login';
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
            const token = Cookies.get('token');
            if (!token && user?.access) {
                const decoded = parseJwt(user?.access);
                Cookies.set('token', user?.access, {
                    expires: (decoded?.exp ? new Date(decoded.exp * 1000) : 8) as any,
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
