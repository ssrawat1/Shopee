import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import cart_icon from "../assets/cart_icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItemsData } from "../Slices/CartSlice";
import { fetchProductsData } from "../Slices/ProductsReducer"; // Import setError action

export default function Header() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProductsData());
    dispatch(fetchCartItemsData());
  }, [dispatch]);

  const cartItems = useSelector((state) => state.cartLists.list);
  const quantityOfItems = () =>
    cartItems.reduce((prevItem, currItem) => prevItem + currItem.quantity, 0);

  return (
    <header>
      <div className="header-contents">
        <h1>
          <Link to="/">Shopee</Link>
        </h1>
        <Link className="cart-icon" to="/cart">
          <img src={cart_icon} alt="cart-icon" />
          <div className="cart-items-count">{quantityOfItems()}</div>
        </Link>
      </div>
    </header>
  );
}

// dispatch(
//   fetchData({
//     url: "carts/5",
//     onStart: fetchCartItems.type,
//     onSuccess: loadCartItems.type,
//     onError: setCartError.type,
//   })
// );

// dispatch({
//   type: "api/makeCall",
//   payload: {
//     url: "carts/5",
//     onStart: fetchCartItems.type,
//     onSuccess: loadCartItems.type,
//     onError: setCartError.type,
//   },
// });

// const fetchLoadCartData = async () => {
//   dispatch(fetchCartItems());
//   try {
//     const response = await fetch("https://fakestoreapi.com/carts/5");
//     const data = await response.json();
//     console.log(data);
//     dispatch(loadCartItems(data));
//   } catch (error) {
//     dispatch(setCartError("Oops! Something went wrong.")); // Dispatch setError action with error message
//   }
// };
// fetchProductsData();
// fetchLoadCartData();
