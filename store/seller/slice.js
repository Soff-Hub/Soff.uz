import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  activeIndex: 'about_author'
}


const sellerDetailsSlice = createSlice({
  name: 'userDetails',
  initialState,
  reducers: {
    setActiveIndex(state, action) {
      state.activeIndex = action.payload
    }
  }
})

export const { setActiveIndex } = sellerDetailsSlice.actions;
export default sellerDetailsSlice.reducer;