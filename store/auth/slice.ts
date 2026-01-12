import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

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
            localStorage.setItem('user', JSON.stringify(user));
            Cookies.set('token', user?.access, {
                expires: jwtDecode(user?.access)?.exp || 8,
            });
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
