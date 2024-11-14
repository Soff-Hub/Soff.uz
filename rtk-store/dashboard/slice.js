import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    graphParams: {
        year: new Date().getFullYear(),
        month: '',
    },
    commentsPage: 1,
};

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        updateGraphParams: (state, action) => {
            state.graphParams = { ...state.graphParams, ...action.payload };
        },
        updateCommentsPage: (state, action) => {
            state.commentsPage = action.payload;
        },
    },
});

export const { updateGraphParams, updateCommentsPage } = dashboardSlice.actions;
export default dashboardSlice.reducer;
