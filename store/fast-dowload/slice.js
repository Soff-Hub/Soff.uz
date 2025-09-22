import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: "ui",
    initialState: {
        showFastDownload: true,
    },
    reducers: {
        setShowFastDownload(state, action) {
            state.showFastDownload = action.payload;
        },
    },
});

export const { setShowFastDownload } = uiSlice.actions;
export default uiSlice.reducer;
