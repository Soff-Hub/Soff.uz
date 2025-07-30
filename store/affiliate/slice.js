import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    affiliateId: null,
};

const affiliateSlice = createSlice({
    name: 'affiliate',
    initialState,
    reducers: {
        setAffiliateId: (state, action) => {
            state.affiliateId = action.payload;
        },
    },
});

export const { setAffiliateId } = affiliateSlice.actions;
export default affiliateSlice.reducer;
