import { configureStore } from '@reduxjs/toolkit';

import auth from './auth/slice';
import ecomerce from './ecomerce/slice';
import affiliate from './affiliate/slice';
import user from './seller/slice';
import profile from './profile/slice';
import search from './search/slice';
import ui from './fast-dowload/slice';
import { apiFreelanceSlice, apiSoffSlice } from './api/apiSlice';

export const store = configureStore({
    reducer: {
        auth,
        ecomerce,
        affiliate,
        user,
        search,
        profile,
        ui,
        [apiSoffSlice.reducerPath]: apiSoffSlice.reducer,
        [apiFreelanceSlice.reducerPath]: apiFreelanceSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(apiSoffSlice.middleware)
            .concat(apiFreelanceSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
