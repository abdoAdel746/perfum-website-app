import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addItem,
  removeItem,
  incrementQuantity,
  decrementQuantity,
} from "./CartSlice";
import { BsCart4 } from "react-icons/bs";
import "./shopcart.scss";
import { CheckoutBody } from "../../pages/checkout/CheckoutBody";
import { Link, useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import KUTE from "kute.js";

export const ShopCart = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart); // Replace "cart" with the correct slice name
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const addToCart = (item) => {
    console.log(item);
    dispatch(addItem(item));
  };

  const incrementItemQuantity = (item) => {
    dispatch(incrementQuantity(item.id));
  };

  const decrementItemQuantity = (item) => {
    dispatch(decrementQuantity(item.id));
  };

  const removeFromCart = (itemId) => {
    dispatch(removeItem(itemId));
  };
  const cartTotalPrice = useSelector((state) =>
    state.cart.reduce((total, item) => total + item.price * item.quantity, 0)
  );

  useEffect(() => {
    if (isCartOpen) {
      const element = document.getElementById("close_shop");
      if (element) {
        KUTE.to(
          "#line",
          { path: "#close_shop" }
          // { duration: 1000 },
          // { delay: 100 }
        ).start();
      }
    }
  }, [isCartOpen]);

  return (
    <div className="relative cartIcon" onClick={toggleCart}>
      <button aria-label="add">
        <BsCart4 className="text-2xl" />
      </button>

      {/* Cart count badge */}
      <div className="absolute cartBadge">{cartItems.length}</div>

      {/* Cart Dropdown */}
      {isCartOpen && (
        <div
          id="default_modal"
          tabIndex="-1"
          aria-hidden="true"
          className="cart_nav fixed"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative">
            <div className="relative">
              <div className="flex close">
                <div className=" flex justify-center">
                  <img src="/public/assets/images/logo.png" alt="logo" />
                </div>
                <button
                  onClick={toggleCart}
                  type="button"
                  data-modal-hide="default_modal"
                  aria-label="close"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="100"
                    height="100"
                    viewBox="0 0 50 50"
                  >
                    <path
                      id="line"
                      fill="white"
                      stroke="white"
                      stroke-linejoin="round"
                      stroke-width="10"
                      d="M 10 10 L 110 10 L 110 60 L 10 60 L 10 10"
                    />

                    <path
                      id="close_shop"
                      style={{ visibility: "hidden" }}
                      d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"
                    ></path>
                  </svg>

                  {/* <IoMdClose  /> */}
                </button>
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
                        Total Price:{" "}
                        <span>
                          $
                          {cartItems
                            .map((item) => item.price * item.stoke)
                            .reduce((acc, val) => acc + val, 0)
                            .toFixed(2)}
                        </span>
                      </p>
                      <button
                        onClick={() => {
                          navigate(`/Checkout/place_order`);
                          toggleCart();
                        }}
                        className="byn_standard"
                        aria-label="order"
                      >
                        Place Order
                      </button>
                    </div>
                  </>
                ) : (
                  <p className="err_cart">no products added yet....</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
