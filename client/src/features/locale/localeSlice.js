import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "En",
};

export const localeSlice = createSlice({
  name: "value",
  initialState,
  reducers: {
    switchLocale: (state,action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { switchLocale } = localeSlice.actions;

export default localeSlice.reducer;
