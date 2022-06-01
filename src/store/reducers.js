import { combineReducers } from "@reduxjs/toolkit";
import favoriteReducer from "./favoriteSlice";

const rootReducer = combineReducers({
  favorite: favoriteReducer,
});

export default rootReducer;
