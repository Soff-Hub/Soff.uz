import { createSlice } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const initialState = {
    pageParams: {
        page: 1,
        page_size: 10,
    },
    hostingPageParams: {
        page: 1,
        page_size: 10,
    },
};

const reportsSlice = createSlice({
    name: 'reports',
    initialState,
    reducers: {
        updateReportPagePrams: (state, action) => {
            if (action.payload.page) {
                state.pageParams.page = action.payload.page;
            }
            if (action.payload.page_size) {
                state.pageParams.page_size = action.payload.page_size;
            }
        },
        updateHostingPagePrams: (state, action) => {
            if (action.payload.page) {
                state.hostingPageParams.page = action.payload.page;
            }
            if (action.payload.page_size) {
                state.hostingPageParams.page_size = action.payload.page_size;
            }
        },
    },
});

const persistConfig = {
    key: 'reports',
    storage,
    whitelist: ['pageParams', 'hostingPageParams'],
};

export const { updateReportPagePrams, updateHostingPagePrams } =
    reportsSlice.actions;
export const persistedReportsReducer = persistReducer(
    persistConfig,
    reportsSlice.reducer
);
export default reportsSlice.reducer;
