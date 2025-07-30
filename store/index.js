import { configureStore } from '@reduxjs/toolkit';

import auth from './auth/slice';
import ecomerce from './ecomerce/slice';
import affiliate from './affiliate/slice';

export const store = configureStore({
    reducer: {
        auth,
        ecomerce,
        affiliate,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
