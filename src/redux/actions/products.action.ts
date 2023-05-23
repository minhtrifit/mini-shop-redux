import { createAction } from "@reduxjs/toolkit";

export const sortProductsList = createAction<string>("products/sortByCategory");
export const getProductsListPerPage = createAction<number>(
  "products/getProductsListPerPage"
);
export const resetAddProductCheck = createAction(
  "products/resetAddProductCheck"
);
