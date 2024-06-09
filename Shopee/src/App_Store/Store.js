// import { createStore } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "../Slices/CartSlice";
import ProductsReducer from "../Slices/ProductsReducer";
import WishListReducer from "../Slices/WishListReducer";
import { apiMiddleware } from "./MiddleWare/apiMiddleware";
import { thunkMiddleware } from "./MiddleWare/thunkMiddleware";

const Store = configureStore({
  reducer: {
    ProductsList: ProductsReducer,
    cartLists: CartSlice,
    wishList: WishListReducer,
  },
  middleware: (getDefaultMiddleware) =>[...getDefaultMiddleware(),apiMiddleware, thunkMiddleware]
 });

Store.subscribe(() => {
  console.log(Store.getState());
});

// import { produce } from "immer";

// import {
//   addItemToCart,
//   removeItemFromCart,
//   increaseItemQuantity,
//   decreaseItemQuantity,
//   addItemToWishList,
//   removeItemToWishList,
// } from "../ActionCreators/ActionCreators";

// const Store = createStore(
//   reducer,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

// let users = [
//   {
//     name: "sanjay signh rawat",
//     age: 25,
//     occupation: "Software Developer",
//   },
// ];
// const newUsers = produce(users, (usersCopy) => {
//   usersCopy[0].age = 20;
// });

// console.log(newUsers);

// Store.subscribe(() => {
//   console.log(Store.getState());
// });

// Dispatching actions using action creators
// Store.dispatch(addItemToCart(1, 1)); // repetition se bachne ke liye humne function banata
// Store.dispatch(addItemToCart(2, 6));
// Store.dispatch(addItemToCart(3, 3));
// Store.dispatch(removeItemFromCart(3));
// Store.dispatch(increaseItemQuantity(1, 1));
// Store.dispatch(decreaseItemQuantity(2, 2));

// Store.dispatch(addItemToWishList(4, 2));
// Store.dispatch(addItemToWishList(5, 4));
// Store.dispatch(addItemToWishList(6, 1));
// Store.dispatch(removeItemToWishList(6));

export default Store;
