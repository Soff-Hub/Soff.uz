import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { api } from '~/repositories/api';
import { apiForFreelance } from '~/repositories/api';
import { authAxios } from '~/repositories/authApi';

export const fetchProfile = createAsyncThunk(
    'auth/fetchProfile',
    async (_, { getState }) => {
        try {
            const response = await authAxios.get('/auth/profile');
            return response.data;
        } catch (error) {}
    }
);

export const fetchDirections = createAsyncThunk(
    'api/v1/categories/all-directions',
    async (_) => {
        try {
            const response = await apiForFreelance.get(
                'categories/all-directions'
            );
            return response.data;
        } catch (error) {
            return [];
        }
    }
);

const initialState = {
    user: null,
    directions: [],
    loading: false,
    error: null,
};

const userProfile = createSlice({
    name: 'userProfile',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfile.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(fetchProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchDirections.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchDirections.fulfilled, (state, action) => {
                state.loading = false;
                state.directions = action.payload.map((dir) => ({
                    label: dir.title,
                    value: dir.value,
                }));
            })
            .addCase(fetchDirections.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { logout } = userProfile.actions;
export default userProfile.reducer;
