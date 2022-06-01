import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoriteList: [],
};

export const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    starToggle: (state, action) => {
      if (state.favoriteList.includes(action.payload)) {
        state.favoriteList = state.favoriteList.filter(
          (el) => el !== action.payload
        );
        return;
      }
      state.favoriteList.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { starToggle } = favoriteSlice.actions;

export default favoriteSlice.reducer;
