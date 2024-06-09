import React, { useMemo } from "react";
import CartItem from "../Components/CartItem";
import { useSelector } from "react-redux";
import {
  getCartError,
  getAllCartItems,
  getCartLoadingState,
} from "../Slices/CartSlice";

export default function Cart() {
  const cartItems = useSelector(getAllCartItems);
  // console.log(cartItems);
  const isLoading = useSelector(getCartLoadingState);
  // console.log(isLoading)
  const error = useSelector(getCartError);
  // console.log(error);
  const totalAmount = useMemo(
    () =>
      cartItems
        .reduce((prev, curr) => prev + curr.quantity * curr.price, 0)
        .toFixed(2),
    [cartItems]
  );

  return (
    <div className="cart-container">
      <h2>Items in Your Cart</h2>
      <div className="cart-items-container">
        <div className="cart-header cart-item-container">
          <div className="cart-item">Item</div>
          <div className="item-price">Price</div>
          <div className="quantity">Quantity</div>
          <div className="total">Total</div>
        </div>
        {isLoading ? (
          <h2 style={{ color: "red", textAlign: "center", marginTop: "25vh" }}>
            Loading...
          </h2>
        ) : (
          cartItems.map(({ id, title, rating, price, image, quantity }) => (
            <CartItem
              key={id}
              productId={id}
              title={title}
              price={price}
              quantity={quantity}
              imageUrl={image}
              rating={rating}
            />
          ))
        )}
        {error && (
          <div
            className="error-message"
            style={{ textAlign: "center", color: "red" }}
          >
            <h1>{error}</h1>
          </div>
        )}
        <div className="cart-header cart-item-container">
          <div></div>
          <div></div>
          <div></div>
          {!isLoading && !error && <div className="total">${totalAmount}</div>}
        </div>
      </div>
    </div>
  );
}
