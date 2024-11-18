import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const initialState = {
    productParams: {
        status: '',
        page: 1,
        sort: '',
        document__content_type: '',
        search: '',
        category: '',
        discount_price_before: '',
        discount_price_after: '',
        date_range_after: '',
        date_range_before: '',
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
            if (action.payload?.page_size) {
                localStorage.getItem('page_size', action.payload?.page_size);
            }
            state.productParams = {
                ...state.productParams,
                page: 1,
                ...action.payload,
            };
        },
        resetProductParams: (state) => {
            state.productParams = {
                status: '',
                page: 1,
                page_size: state.productParams.page_size,
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
    whitelist: ['productParams', 'openFilter'], // Faqat productParams saqlanadi
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
} = productsSlice.actions;

export const persistedProductsReducer = persistReducer(
    persistConfig,
    productsSlice.reducer
);
export default productsSlice.reducer;
