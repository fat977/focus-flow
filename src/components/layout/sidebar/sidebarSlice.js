import { createSlice } from "@reduxjs/toolkit";

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: {
    isCollapsed: false,
    isMobileOpen: false,
  },
  reducers: {
    toggleSidebar(state) {
      state.isCollapsed = !state.isCollapsed;
    },
    setSidebarState(state, action) {
      state.isCollapsed = action.payload;
    },

    toggleMobileSidebar(state) {
      state.isMobileOpen = !state.isMobileOpen;
    },
    closeMobileSidebar(state) {
      state.isMobileOpen = false;
    },
  },
});

export const {
  toggleSidebar,
  setSidebarState,
  toggleMobileSidebar,
  closeMobileSidebar,
} = sidebarSlice.actions;
export default sidebarSlice.reducer;
