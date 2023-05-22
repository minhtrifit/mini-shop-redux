import { combineReducers } from "@reduxjs/toolkit";
import productReducer from "./products.reducer";
import categoryReducer from "./caterogies.reducer";

export const rootReducer = combineReducers({
  products: productReducer,
  categories: categoryReducer,
});
