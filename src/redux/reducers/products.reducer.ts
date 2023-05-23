import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "../../types/product.type";
import axios from "axios";

import { PendingAction, RejectedAction } from "../../types/reduxthunk.type";

import {
  sortProductsList,
  getProductsListPerPage,
} from "../actions/products.action";

// Interface declair
interface ProductState {
  currentId: string;
  productList: Product[];
  productListPerPage: Product[];
  pageCount: number;
  sortList: Product[];
  isLoading: boolean;
  isError: boolean;
}

// createAsyncThunk middleware
export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  // Dùng dấu _ cho các API không có params
  async (_, thunkAPI) => {
    try {
      const response = await axios.get<Product[]>(
        `${import.meta.env.VITE_API_URL}/products`,
        {
          signal: thunkAPI.signal,
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// InitialState value
const initialState: ProductState = {
  currentId: "",
  productList: [],
  productListPerPage: [],
  pageCount: 0,
  sortList: [],
  isLoading: false,
  isError: false,
};

const productReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getAllProducts.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getAllProducts.fulfilled, (state, action) => {
      // Set product list
      state.productList = action.payload;

      // Set page count
      state.pageCount = Math.ceil(action.payload.length / 6);

      // Set default product list per page (page = 1)
      const begin = (1 - 1) * 6;
      const end = (1 - 1) * 6 + 6;
      state.productListPerPage = action.payload.slice(begin, end);

      state.isLoading = false;
    })
    .addCase(sortProductsList, (state, action) => {
      if (action.payload !== "All categories") {
        const sortList = state.productList.filter((product) => {
          return product.category === action.payload;
        });
        state.sortList = sortList;

        // Set page count
        state.pageCount = Math.ceil(sortList.length / 6);
      } else {
        // Set page count
        state.pageCount = Math.ceil(state.productList.length / 6);
      }
    })
    .addCase(getProductsListPerPage, (state, action) => {
      const begin = (action.payload - 1) * 6;
      const end = (action.payload - 1) * 6 + 6;
      state.productListPerPage = state.productList.slice(begin, end);
    })
    .addMatcher(
      (action): action is PendingAction => action.type.endsWith("/pending"),
      (state, action) => {
        state.currentId = action.meta.requestId;
      }
    )
    .addMatcher(
      (action): action is RejectedAction => action.type.endsWith("/rejected"),
      (state, action) => {
        if (state.isLoading && state.currentId === action.meta.requestId) {
          state.isLoading = false;
          state.isError = true;
        }
      }
    );
});

export default productReducer;
