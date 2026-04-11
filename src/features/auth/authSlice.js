import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  isInitialLoading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = {
        ...action.payload,
        id: action.payload.uid, // 👈 اعملي mapping للـ uid عشان يبقى اسمه id
      };
      state.isAuthenticated = !!action.payload;
      state.isInitialLoading = false;
    },
    updateUser(state, action) {
      if (state.user) {
        state.user = {
          ...state.user,
          ...action.payload,
        };
      }
    },
    clearUser(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.isInitialLoading = false;
    },
  },
});

export const { setUser, updateUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
