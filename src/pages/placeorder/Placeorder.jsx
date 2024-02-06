import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import axios from "axios"; // Import Axios
import {
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import "./placeorder.scss";
import { Loading } from "../../components/common/loading/Loading";

const stripePromise = loadStripe(
  "pk_test_51OZzF6ICqewU6e5k7Lt4iFxq2rGBqDTVmcsWueHAA0cvGqQxiEjh6nf1uyeq5ERhrOulUVkX5u3JVYD9Gi6h50mZ001u5QQEJY"
);

export const Placeorder = () => {
  const [isloading, setisloading] = useState(false);

  const cartItems = useSelector((state) => state.cart);
  let cartTotalPrice;
  if (cartItems != undefined) {
    cartTotalPrice = cartItems.reduce(
      (total, item) => total + item.price * item.stoke,
      0
    );
  }
  const userEmail = localStorage.getItem("user email");
  const userName = localStorage.getItem("user name");
  const stripe = useStripe();
  const elements = useElements();
  // if (cartItems != undefined) {
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if Stripe or elements is not initialized
    if (!stripe || !elements) {
      return;
    }

    // Check if cartItems is undefined or empty
    if (!cartItems || cartItems.length === 0) {
      console.log("Cart is empty or not defined.");
      // You can also handle this case differently based on your application logic
      return;
    }

    // const cardElement = elements.getElement(CardElement);

    // const { error, paymentMethod } = await stripe.createPaymentMethod({
    //   type: "card",
    //   card: cardElement,
    //   billing_details: { email: userEmail }, // Include the email here
    // });

    // if (error) {
    //   console.log("[error]", error);
    //   return;
    // }

    // console.log("[PaymentMethod]", paymentMethod);
    console.log(cartTotalPrice);
    try {
      setisloading(true);

      // Use Axios to send a POST request
      const response = await axios.post(
        "https://five5-08t6.onrender.com/create-checkout-session",
        {
          // paymentMethodId: paymentMethod.id,
          cartTotalPrice: cartTotalPrice,
          userName: userName,
          userEmail: userEmail,
        }
      );

      if (response.data && response.data.sessionId) {
        // Redirect to Stripe Checkout
        const result = await stripe.redirectToCheckout({
          sessionId: response.data.sessionId,
        });
        if (result.error) {
          console.error(
            "Error in redirecting to checkout:",
            result.error.message
          );
          // Handle checkout redirection error
        }
      }
    } catch (error) {
      console.error("Error:", error.request.response);
    } finally {
      setisloading(false);
    }
  };

  return (
    <section className="order">
      <h1>order summary</h1>
      <div className="box">
        <ul>
          <li>
            <span>tax</span>
            <span>{(cartTotalPrice * 0.1).toFixed(0)}</span>
          </li>
          <li>
            <span>shiping</span>
            <span>{(cartTotalPrice * 0.2).toFixed(0)}</span>
          </li>
          <li>
            <span>website</span>
            <span>{(cartTotalPrice * 0.3).toFixed(0)}</span>
          </li>
          <li>
            <span>owner</span>
            <span>{(cartTotalPrice * 0.5).toFixed(0)}</span>
          </li>
        </ul>
      </div>
      <div className="total_price">
        <p>
          Total Price: <span>${cartTotalPrice.toFixed(0)}</span>
        </p>
        <form onSubmit={handleSubmit}>
          <button type="submit" disabled={!stripe}>
            {isloading ? <Loading className="loading_btn" /> : "Pay now"}
          </button>
        </form>
        <script async src="https://js.stripe.com/v3/buy-button.js"></script>

        <stripe-buy-button
          buy-button-id="buy_btn_1OZzYjIKedvA98wCcqFqslVR"
          publishable-key="pk_test_51OPvLIIKedvA98wCFtO4VVbvZVAZ389pPNnS4KIIXc92TccnYsW0tQyd3nUBh1rqZvxLzdEQpllt5SyaXu8Pf1FA00BKBskW23"
        ></stripe-buy-button>
      </div>
    </section>
  );
};
