import { configureStore } from '@reduxjs/toolkit';

import auth from './auth/slice';
import ecomerce from './ecomerce/slice';
import affiliate from './affiliate/slice';
import user from './seller/slice'
import profile from './profile/slice'
export const store = configureStore({
    reducer: {
        auth,
        ecomerce,
        affiliate,
        user,
        profile
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
