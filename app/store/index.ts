import { configureStore } from '@reduxjs/toolkit';

import auth from '~/store/auth/slice';
import ecomerce from '~/store/ecomerce/slice';
import affiliate from '~/store/affiliate/slice';
import user from '~/store/seller/slice';
import profile from '~/store/profile/slice';
import search from '~/store/search/slice';
import ui from '~/store/fast-dowload/slice';
import { apiFreelanceSlice, apiSoffSlice } from '~/store/api/apiSlice';

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
