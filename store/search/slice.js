import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    searchHistory: [],
    status: 'loading',
};

export const initSearchHistory = createAsyncThunk(
    'search/initSearchHistory',
    async () => {
        const searchHistory =
            JSON.parse(localStorage.getItem('searchHistory')) || [];
        return searchHistory;
    }
);

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchHistory(state, action) {
            state.searchHistory = action.payload;
            localStorage.setItem(
                'searchHistory',
                JSON.stringify(action.payload)
            );
        },
        setSearchHistoryItem(state, action) {
            const existingIndex = state.searchHistory.findIndex(
                (item) => item.value === action.payload.value
            );
            if (existingIndex === -1) {
                state.searchHistory.push(action.payload);
                localStorage.setItem(
                    'searchHistory',
                    JSON.stringify(state.searchHistory)
                );
            }
        },
        deleteSearchHistoryItem(state, action) {
            state.searchHistory = state.searchHistory.filter(
                (item) => item.value !== action.payload.value
            );
            localStorage.setItem(
                'searchHistory',
                JSON.stringify(state.searchHistory)
            );
        },
        clearSearchHistory(state) {
            state.searchHistory = [];
            localStorage.removeItem('searchHistory');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(initSearchHistory.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(initSearchHistory.fulfilled, (state, action) => {
                state.status = 'idle';
                state.searchHistory = action.payload;
            })
            .addCase(initSearchHistory.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export const {
    setSearchHistory,
    setSearchHistoryItem,
    deleteSearchHistoryItem,
    clearSearchHistory,
} = searchSlice.actions;

export default searchSlice.reducer;
