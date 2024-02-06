import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeItem,
  incrementQuantity,
  decrementQuantity,
} from "../../components/common/CartSlice";
import {  useNavigate } from "react-router-dom";
import "./cehkout.scss";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { RiDeleteBack2Line } from "react-icons/ri";

export const CheckoutBody = () => {
    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();
  
    const incrementItemQuantity = (item) => dispatch(incrementQuantity(item.id));
    const decrementItemQuantity = (item) => dispatch(decrementQuantity(item.id));
    const removeFromCart = (itemId) => dispatch(removeItem(itemId));
  
    const cartTotalPrice = cartItems.reduce(
      (total, item) => total + item.price * item.stoke,
      0
    );
    const navigate = useNavigate();
  return (
    <div className="products">
        {cartItems.map((item) => (
          <div key={item.id} className=" flex items-center product_item">
            <div className="img_details_combine">
              <div className="img_box">
                <img
                  src={item.product_image}
                  alt={item.product_name}
                  className="4"
                />
              </div>

              <div className="box_details">
                <h3>{item.category}</h3>
                <h2>{item.product_name}</h2>
                <h1>${(item.price * item.stoke).toFixed(0)}</h1>
              </div>
            </div>

            <div className="flex Quantity">
              <div className="up_q">Quantity</div>
              <div className="down_q">
                <FaMinus
                  onClick={() => decrementItemQuantity(item)}
                  disabled={item.stoke === 1}
                />

                <span>{item.stoke}</span>
                <FaPlus onClick={() => incrementItemQuantity(item)} />
              </div>
            </div>
            <RiDeleteBack2Line
              className="de_product"
              onClick={() => removeFromCart(item.id)}
            />
          </div>
        ))}
      </div>
  );
};
