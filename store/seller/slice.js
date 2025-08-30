import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  activeIndex: 'about_author',
  unreadMessages: 0
}


const sellerDetailsSlice = createSlice({
  name: 'userDetails',
  initialState,
  reducers: {
    setActiveIndex(state, action) {
      state.activeIndex = action.payload
    },
    setUnreadMessages(state, action) {
      state.unreadMessages = action.payload
    }
  }
})

export const { setActiveIndex, setUnreadMessages } = sellerDetailsSlice.actions;
export default sellerDetailsSlice.reducer;