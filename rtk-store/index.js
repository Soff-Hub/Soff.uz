import { configureStore } from '@reduxjs/toolkit';

import auth from './auth';
import ecomerce from './ecomerce';

export const store = configureStore({
    reducer: {
        auth,
        ecomerce
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
