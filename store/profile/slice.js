import { createSlice } from "@reduxjs/toolkit";
import { authAxios } from "~/repositories/authApi";


export const fetchProfile = createAsyncThunk(
  "auth/fetchProfile",
  async (_, { getState }) => {
    const { auth } = getState();

    // ✅ user agar store’da bo‘lsa qayta chaqirmaydi
    if (auth.user) {
      return auth.user;
    }

    const response = await authAxios.get("/auth/profile/");
    return response.data;
  }
);

const initialState = {
  user: null,
  loading: false,
  error: null,
}

const userProfile = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { logout } = userProfile.actions;
export default userProfile.reducer;