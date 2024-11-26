import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const initialState = {
    productParams: {
        status: '',
        sort: '',
        document__content_type: '',
        search: '',
        category: '',
        discount_price_before: '',
        discount_price_after: '',
        date_range_after: '',
        date_range_before: '',
        book: '',
    },
    pageParams: {
        page: 1,
        page_size: 10,
    },
    openFilter: false,
    productData: null,
    approvedProductData: null,
    detailLoader: false,
    detailModal: false,
    deleteId: null,
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        updateProductParams: (state, action) => {
            if (
                Object.keys(action.payload).includes('search') &&
                action.payload.search !== ''
            ) {
                state.pageParams.page = 1;
            }
            state.productParams = {
                ...state.productParams,
                ...action.payload,
            };
        },
        resetProductParams: (state) => {
            state.productParams = {
                status: '',
                sort: '',
                document__content_type: '',
                search: '',
                category: '',
                discount_price_before: '',
                discount_price_after: '',
                date_range_after: '',
                date_range_before: '',
            };
        },
        updatePageParams: (state, action) => {
            state.pageParams = { ...state.pageParams, ...action.payload };
        },
        setProductData: (state, action) => {
            state.productData = action.payload;
        },
        setOpenFilter: (state, action) => {
            state.openFilter = action.payload;
        },
        setDetailLoader: (state, action) => {
            state.detailLoader = action.payload;
        },
        setDetailModal: (state, action) => {
            state.detailLoader = action.payload;
            state.detailModal = action.payload;
        },
        setProductDeleteId: (state, action) => {
            state.deleteId = action.payload;
        },
        setApprovedProductData: (state, action) => {
            state.approvedProductData = action.payload;
        },
    },
});

const persistConfig = {
    key: 'products',
    storage,
    whitelist: ['pageParams', 'openFilter'],
};

export const {
    updateProductParams,
    setProductData,
    setDetailLoader,
    setDetailModal,
    setProductDeleteId,
    setApprovedProductData,
    resetProductParams,
    setOpenFilter,
    updatePageParams,
} = productsSlice.actions;

export const persistedProductsReducer = persistReducer(
    persistConfig,
    productsSlice.reducer
);
export default productsSlice.reducer;
