import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: "ui",
    initialState: {
        showFastDownload: true,
        showSearch: true
    },
    reducers: {
        setShowFastDownload(state, action) {
            state.showFastDownload = action.payload;
        },
        setShowSearch(state, action){
            state.showSearch = action.payload
        }
    },
});

export const { setShowFastDownload, setShowSearch } = uiSlice.actions;
export default uiSlice.reducer;
