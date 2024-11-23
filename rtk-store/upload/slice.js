import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const initialState = {
    uploading: null,
};

const uploadSlice = createSlice({
    name: 'upload',
    initialState,
    reducers: {
        updateUploadingFile: (state, action) => {
            state.uploading = action.payload;
        },
    },
});

const persistConfig = {
    key: 'upload',
    storage,
    whitelist: ['uploading'],
};

export const { updateUploadingFile } = uploadSlice.actions;

export const persistedUploadReducer = persistReducer(
    persistConfig,
    uploadSlice.reducer
);
export default uploadSlice.reducer;
