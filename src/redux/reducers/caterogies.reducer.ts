import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import { Category } from "../../types/product.type";
import axios from "axios";

// createAsyncThunk declair
export const getAllCategories = createAsyncThunk(
  "products/getAllCategories",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  // Dùng dấu _ cho các API không có params
  async (_, thunkAPI) => {
    try {
      const response = await axios.get<string[]>(
        `${import.meta.env.VITE_API_URL}/products/categories`,
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

// Reducer InitialState interface declair
interface ProductState {
  categories: Category[];
  isLoading: boolean;
  isError: boolean;
}

// InitialState value
const initialState: ProductState = {
  categories: [
    {
      value: "All categories",
      label: "All categories",
    },
  ],
  isLoading: false,
  isError: false,
};

const categoryReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getAllCategories.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getAllCategories.fulfilled, (state, action) => {
      action.payload.forEach((categoryValue: string) => {
        state.categories.push({
          value: categoryValue,
          label: categoryValue,
        });
      });
      state.isLoading = false;
    })
    .addCase(getAllCategories.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
});

export default categoryReducer;
