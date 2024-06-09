import React from "react";
import { useDispatch } from "react-redux";
// import { decreaseItemQuantity, increaseItemQuantity, removeItemFromCart } from "../ActionCreators/ActionCreators";
import {
  decreaseItemQuantity,
  increaseItemQuantity,
  removeItemFromCart,
} from "../Slices/CartSlice";

export default function CartItem({
  productId,
  title,
  rating,
  price,
  imageUrl,
  quantity,
}) {
  const dispatch = useDispatch();

  return (
    <div className="cart-item-container">
      <div className="cart-item">
        <img src={imageUrl} alt={title} />
        <div>
          <h5>{title}</h5>
          <p>{+rating.rate} ★ ★ ★ ★</p>
        </div>
      </div>
      <div className="item-price">${price}</div>
      <div className="item-quantity">
        <button
          onClick={() => dispatch(decreaseItemQuantity({ productId }))}
          style={{ fontWeight: "bolder" }}
        >
          -
        </button>
        <span>{quantity}</span>
        <button
          onClick={() => dispatch(increaseItemQuantity({ productId }))}
          style={{ fontWeight: "bolder" }}
        >
          +
        </button>
        <div>
          <button
            className="remove_items"
            onClick={() => dispatch(removeItemFromCart({ productId }))}
          >
            Remove
          </button>
        </div>
      </div>
      <div className="item-total">${(quantity * price).toFixed(2)}</div>
    </div>
  );
}
