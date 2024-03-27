import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = { isDarkMode: false };

const darkModeSlice = createSlice({
  name: "darkMode",
  initialState,
  reducers: {
    toggleDarkMode(state) {
      state.isDarkMode = !state.isDarkMode;
    },
  },
});

const preloadedState = {
  darkMode: sessionStorage.getItem("isDarkMode") === "true" ? true : false,
};

const store = configureStore({
  preloadedState,
  reducer: darkModeSlice.reducer,
});

export const darkModeActions = darkModeSlice.actions;

store.subscribe(() => {
  const state = store.getState();
  if (state.isDarkMode) {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
});

export default store;
