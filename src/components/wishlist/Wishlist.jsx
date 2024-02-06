import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addToWishlist,
  removeFromWishlist,
  removeAllFromWishlist,
} from "./WishlistSlice";
import { addItem } from "../common/CartSlice";
import { IoMdClose } from "react-icons/io";
import { FaHeartCircleCheck } from "react-icons/fa6";
import { Card } from "../common/card/Card";
import "./wishlist.scss";

export const Wishlist = () => {
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  const wishlistItems = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const toggleWishlist = () => {
    setIsWishlistOpen(!isWishlistOpen);
  };

  const addToWishlist = (item) => {
    dispatch(addToWishlist(item));
  };
  const handleRemoveFromWishlist = (itemId) => {
    console.log(itemId);
    dispatch(removeFromWishlist(itemId));
  };
  const handleRemoveAllFromWishlist = () => {
    dispatch(removeAllFromWishlist());
  };

  const handleAddToCart = (item) => {
    console.log(item);
    dispatch(addItem(item));
  };

  useEffect(() => {
    console.log("changed");
  }, [wishlistItems]); // Only run when wishlistItems change

  return (
    <div className="relative cartIcon" onClick={toggleWishlist}>
      <button aria-label="wisshlist">
        <FaHeartCircleCheck className="text-2xl" />
      </button>

      {/* Cart count badge */}
      <div className="absolute cartBadge">{wishlistItems.length}</div>

      {/* Cart Dropdown */}
      {isWishlistOpen && (
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
                  onClick={toggleWishlist}
                  type="button"
                  data-modal-hide="default_modal"
                  aria-label="close"
                >
                  <IoMdClose />
                </button>
              </div>

              <div className="body">
                {wishlistItems.map((item) => (
                  <div className="down_card">
                    <Card key={item.id} data={item} />
                  </div>
                ))}
                {wishlistItems.length === 0 ? (
                  <div className="text-center text-gray-500 mt-4">
                    Your wishlist is empty.
                  </div>
                ) : (
                  <>
                    <button
                      onClick={handleRemoveAllFromWishlist} // Add the button to remove all items
                      className="remove_wishlist byn_standard"
                      aria-label="embty"
                    >
                      empty wihslist
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
