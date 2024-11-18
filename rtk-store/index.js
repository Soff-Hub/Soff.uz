import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';

import auth from './auth';
import ecomerce from './ecomerce';
import dashboard from './dashboard/slice';
import { dashboardApi } from './dashboard/api';
import { persistedProductsReducer } from './products/slice';
import { productsApi } from './products/api';

export const store = configureStore({
    reducer: {
        auth,
        ecomerce,
        dashboard,
        products: persistedProductsReducer,
        [dashboardApi.reducerPath]: dashboardApi.reducer,
        [productsApi.reducerPath]: productsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(dashboardApi.middleware)
            .concat(productsApi.middleware),
});

export const persistor = persistStore(store);
