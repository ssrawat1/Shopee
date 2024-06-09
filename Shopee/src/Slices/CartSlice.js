// import { produce } from "immer";
// import { ActionTypes } from "../ActionCreators/ActionTypes";
import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";

export const fetchCartItemsData = createAsyncThunk(
  "cart/fetchCartItems",
  async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/carts/5");
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
console.dir(fetchCartItemsData);

const findItemIndex = (state, action) =>
  state.findIndex(
    (cartItem) => cartItem.productId === action.payload.productId
  );

const cartSlice = createSlice({
  // it create a Action Types , Action Creators & Reducers
  name: "cart",
  initialState: {
    loading: false,
    list: [],
    error: null,
  },
  reducers: {
    
    addItemToCart: (state, action) => {
      const existingItemIndex = findItemIndex(state.list, action);
      existingItemIndex !== -1
        ? (state.list[existingItemIndex].quantity += 1)
        : state.list.push({ ...action.payload, quantity: 1 });
    },
    removeItemFromCart: (state, action) => {
      const existingItemIndex = findItemIndex(state.list, action);
      existingItemIndex !== -1 && state.list.splice(existingItemIndex, 1);
    },
    increaseItemQuantity: (state, action) => {
      const existingItemIndex = findItemIndex(state.list, action);
      existingItemIndex !== -1 && (state.list[existingItemIndex].quantity += 1);
    },
    decreaseItemQuantity: (state, action) => {
      const existingItemIndex = findItemIndex(state.list, action);
      existingItemIndex !== -1 &&
        (state.list[existingItemIndex].quantity > 1
          ? (state.list[existingItemIndex].quantity -= 1)
          : state.list.splice(existingItemIndex, 1));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItemsData.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error state when fetching
      })
      .addCase(fetchCartItemsData.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.products;
      })
      .addCase(fetchCartItemsData.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
        state.loading = false;
      });
  },
});

// Define the input selectors
const selectCartList = (state) => state.cartLists;
const selectProductsList = (state) => state.ProductsList;

// Define the output selector
export const getCartItems = (cartLists, ProductsList) =>
  cartLists.list
    .map(({ productId, quantity }) => {
      const cartProduct = ProductsList.list.find(
        (product) => product.id === productId
      );
      return { ...cartProduct, quantity };
    })
    .filter((item) => item !== null); // Ensure we only return valid items

export const getAllCartItems = createSelector(
  [selectCartList, selectProductsList],
  getCartItems
);
export const getCartLoadingState = (state) => state.cartLists.loading;
export const getCartError = (state) => state.cartLists.error;



// fetchCartItems: (state, action) => {
    //   state.loading = true;
    //   state.error = null; // Reset error state when fetching
    // },
    // setCartError: (state, action) => {
    //   state.error = action.payload;
    //   state.loading = false;
    // },
    // loadCartItems: (state, action) => {
    //   state.list = action.payload.products;
    //   state.loading = null; // Reset error state on successful load
    // },

// const { fetchCartItems, setCartError, loadCartItems } = cartSlice.actions;
// Thunk Action Creator
// export const fetchCartItemsData = () => async (dispatch) => {
//   dispatch(fetchCartItems());
//   try {
//     const response = await fetch("https://fakestoreapi.com/carts/5");
//     const data = await response.json();
//     dispatch(loadCartItems(data));
//   } catch (error) {
//     dispatch(setCartError("Oops! Something went wrong."));
//   }
// };

// console.log(cartSlice.actions.addItemToCart("i am payload"));
export const {
  addItemToCart,
  removeItemFromCart,
  increaseItemQuantity,
  decreaseItemQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;

/* Second Way */

// const CartReducer = (originalState = [], action) => {
//   return produce(originalState, (state) => {
//     const existingItemIndex = state.findIndex(
//       (cartItem) => cartItem.productId === action.payload.productId
//     );

//     switch (action.type) {
//       case ActionTypes.CART_ADD_ITEM:
//         existingItemIndex !== -1
//           ? (state[existingItemIndex].quantity += 1)
//           : state.push({ ...action.payload, quantity: 1 });
//         break;

//       case ActionTypes.CART_REMOVE_ITEM:
//         existingItemIndex !== -1 && state.splice(existingItemIndex, 1);
//         break;

//       case ActionTypes.CART_INCREASE_ITEM_QUANTITY:
//         existingItemIndex !== -1 && (state[existingItemIndex].quantity += 1);
//         break;

//       case ActionTypes.CART_DECREASE_ITEM_QUANTITY:
//         existingItemIndex !== -1 &&
//           (state[existingItemIndex].quantity > 1
//             ? (state[existingItemIndex].quantity -= 1)
//             : state.splice(existingItemIndex, 1));
//         break;

//       default:
//         return state;
//     }
//   });
// };

/* Firstr Way */

// switch (action.type) {
//   case ActionTypes.CART_ADD_ITEM:
//     const existingItem = state.find(
//       (cartItem) => cartItem.productId === action.payload.productId
//     );
//     return existingItem
//       ? state.map((cartItem) =>
//           cartItem.productId === existingItem.productId
//             ? { ...cartItem, quantity: cartItem.quantity + 1 }
//             : cartItem
//         )
//       : [...state, { ...action.payload, quantity: 1 }];

//   case ActionTypes.CART_REMOVE_ITEM:
//     return state.filter((item) => item.productId !== action.payload.productId);

//   case ActionTypes.CART_INCREASE_ITEM_QUANTITY:
//     return state.map((item) =>
//       item.productId === action.payload.productId
//         ? { ...item, quantity: item.quantity + 1 }
//         : item
//     );

//   case ActionTypes.CART_DECREASE_ITEM_QUANTITY:
//     return state
//       .map((item) =>
//         item.productId === action.payload.productId
//           ? { ...item, quantity: item.quantity - 1 }
//           : item
//       )
//       .filter((item) => item.quantity > 0);

//   default:
//     return state;
// }
