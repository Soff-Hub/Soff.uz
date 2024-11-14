import { configureStore } from '@reduxjs/toolkit';

import auth from './auth';
import ecomerce from './ecomerce';
import dashboard from './dashboard/slice';
import { dashboardApi } from './dashboard/api';

export const store = configureStore({
    reducer: {
        auth,
        ecomerce,
        dashboard,
        [dashboardApi.reducerPath]: dashboardApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(dashboardApi.middleware),
});
