import { createSlice } from '@reduxjs/toolkit';
import { apiFreelanceSlice, apiSoffSlice } from '../api/apiSlice';

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
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setDirections: (state, action) => {
            state.directions = action.payload;
        },
    },
});

const extendedSoffSlice = apiSoffSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProfile: builder.query({
            query: () => '/auth/profile',
            providesTags: ['Profile'],
            onQueryStarted: async (_arg, { dispatch, queryFulfilled }) => {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(userProfile.actions.setUser(data));
                } catch (error) {
                    dispatch(
                        userProfile.actions.setError(
                            error.message ||
                                "Pro'filni olishda xatolik yuz berdi"
                        )
                    );
                }
            },
        }),
    }),
});

const extendedFreelanceSlice = apiFreelanceSlice.injectEndpoints({
    endpoints: (builder) => ({
        getDirections: builder.query({
            query: () => 'api/v1/categories/all-directions',
            providesTags: ['Directions'],
            transformResponse: (response) =>
                response.map((dir) => ({
                    label: dir.title,
                    value: dir.value,
                })),
            onQueryStarted: async (_arg, { dispatch, queryFulfilled }) => {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(userProfile.actions.setDirections(data));
                } catch (error) {
                    dispatch(
                        userProfile.actions.setError(
                            error.message ||
                                "Yo'nalishlarni olishda xatolik yuz berdi"
                        )
                    );
                }
            },
        }),
    }),
});

export const { useGetProfileQuery } = extendedSoffSlice;
export const { useGetDirectionsQuery } = extendedFreelanceSlice;
export const { logout } = userProfile.actions;
export default userProfile.reducer;
