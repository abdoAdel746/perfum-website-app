import React from "react";
import { useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";

import { CheckoutBody } from "./CheckoutBody";

export const Checkout = () => {
  const cartItems = useSelector((state) => state.cart);
  const cartTotalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.stoke,
    0
  );

  const navigate = useNavigate();

  return (
    <div className="checkout">
      <div className="main">
        <h1>CART</h1>
        <div className="location">
          <h2>Home / Cart</h2>
        </div>
      </div>
      <div className="body">
        <div className="box_up">
          <h2>order page</h2>

          <img src="/public/assets/images/Arrow.svg" alt="" srcset="" />
        </div>
        {cartItems.length > 0 ? (
          <>
            <CheckoutBody />
            <div className="total_price">
              <p>
                Total Price: <span>${cartTotalPrice.toFixed(2)}</span>
              </p>
              <button onClick={() => navigate(`/Checkout/place_order`)}>
                Place Order
              </button>
            </div>
          </>
        ) : (
          <p className="err_cart">no products added yet....</p>
        )}
      </div>
    </div>
  );
};
