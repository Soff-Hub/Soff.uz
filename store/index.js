import { configureStore } from '@reduxjs/toolkit';

import auth from './auth/slice';
import ecomerce from './ecomerce/slice';

export const store = configureStore({
    reducer: {
        auth,
        ecomerce,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
