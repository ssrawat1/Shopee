// //Products Reducer
// import { ProductsList } from "../Components/ProductsList";

// export const ProductsReducer = (state = []) => {
//   return state;
// };
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProductsData = createAsyncThunk(
  "product / fetchProducts",
  async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
);

const slice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    list: [],
    error: null, // Add error state
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsData.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsData.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchProductsData.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
        state.loading = false;
      });
  },
});

// Selectors
export const getAllProducts = (state) => state.ProductsList.list;
export const getLoadingState = (state) => state.ProductsList.loading;
export const getProductError = (state) => state.ProductsList.error;

export default slice.reducer;

// const { updateAllProducts, fetchProducts, setProductError } = slice.actions;

// export const fetchProductsItemData = () => async (dispatch) => {
//   dispatch(fetchProducts());
//   try {
//     const response = await fetch("https://fakestoreapi.com/products");
//     const data = await response.json();
//     dispatch(updateAllProducts(data));
//   } catch (error) {
//     dispatch(setProductError("Network response was not ok"));
//   }
// };

// reducers: {
//   fetchProducts: (state) => {
//     state.loading = true;
//     state.error = null; // Reset error state when fetching products
//   },
//   updateAllProducts: (state, action) => {
//     state.list = action.payload;
//     state.loading = false;
//     state.error = null;
//   },
//   setProductError: (state, action) => {
//     // Add a new reducer to set error
//     state.loading = false;
//     state.error = action.payload;
//   },
// },
