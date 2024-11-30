import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';

import auth from './auth';
import ecomerce from './ecomerce';
import dashboard from './dashboard/slice';
import { dashboardApi } from './dashboard/api';
import { persistedProductsReducer } from './products/slice';
import { productsApi } from './products/api';
import { uploadApi } from './upload/api';
import { persistedUploadReducer } from './upload/slice';
import reports, { persistedReportsReducer } from './admin/reportSlice';
import { reportsApi } from './admin/reportsApi';

export const store = configureStore({
    reducer: {
        auth,
        ecomerce,
        dashboard,
        products: persistedProductsReducer,
        uploads: persistedUploadReducer,
        reports: persistedReportsReducer,
        [dashboardApi.reducerPath]: dashboardApi.reducer,
        [productsApi.reducerPath]: productsApi.reducer,
        [uploadApi.reducerPath]: uploadApi.reducer,
        [reportsApi.reducerPath]: reportsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(dashboardApi.middleware)
            .concat(productsApi.middleware)
            .concat(uploadApi.middleware)
            .concat(reportsApi.middleware),
});

export const persistor = persistStore(store);
