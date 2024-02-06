import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { addOrder } from "../../components/common/Paidpoductsslice";
import { useSelector, useDispatch } from "react-redux";
import "./sucess.scss";
import { useReactToPrint } from "react-to-print";
import { clearCart } from "../../components/common/CartSlice";
import Receipt from "./Receipt"; // Import the Receipt class component
import { AxiosConfig } from "../../axiosconfig/AxiosConfig";

export const Success = () => {
  const [orderDetails, setOrderDetails] = useState(null);
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const orderId = searchParams.get("order_id");
  const totalPrice = searchParams.get("price");
  const paymentDate = searchParams.get("payment_date");
  const usern_name = localStorage.getItem("user name");
  const usern_email = localStorage.getItem("user email");
  const cartItems = useSelector((state) => state.cart);
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const dispatch = useDispatch();
  useEffect(() => {
    let isEffectActive = true;

    if (orderId && isEffectActive) {
      dispatch(
        addOrder({
          orderId: orderId,
          usern_name: usern_name,
          usern_email: usern_email,
          totalPrice: totalPrice,
          paymentDate: paymentDate,
          items: cartItems,
        })
      );
    }

    return () => {
      isEffectActive = false;
    };
  }, [orderId, cartItems, dispatch]);

  useEffect(() => {
    if (orderId) {
      dispatch(clearCart());
    }
  }, [orderId, dispatch]);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/get-order-details/${sessionId}`
        );
        setOrderDetails(response.data);

        // updateSoldValue(itemId);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    if (sessionId) {
      fetchOrderDetails();
    }
  }, [sessionId]);

  const updateSoldValue = async (itemId) => {
    try {
      // Send a PATCH request to update the sold value
      const currentDataResponse = await AxiosConfig({
        method: "get",
        url: `http://localhost:8000/items/${itemId}`,
      });

      // const updateOrders = await AxiosConfig({
      //   method: "post",
      //   url: `http://localhost:8000/orders`,
      //   data: {
      //     orderId: orderId,
      //     usern_name: usern_name || "guest",
      //     usern_email: usern_email || "not found",
      //     totalPrice: totalPrice,
      //     paymentDate: paymentDate,
      //     items: cartItems.map((e) => e.product_name), // Implicit return
      //   },
      // });

      const currentItem = currentDataResponse.data;

      // Step 2: Update the item with the new sold value
      const updatedDataResponse = await AxiosConfig({
        method: "patch",
        url: `http://localhost:8000/items/${itemId}`,
        data: {
          sold: currentItem.sold + 1, // Increment the sold value
          stoke: currentItem.stoke - 1, // Increment the sold value
        },
      });

      // console.log(currentDataResponse.data);
      // toast.success("Sold count updated successfully");
    } catch (error) {
      console.error(error);
      // toast.error("Error updating sold count");
    }
  };

  if (sessionId) {
    cartItems.map((e) => {
      updateSoldValue(e.id);
      console.log("id");
    });
  }
  return (
    <>
      <Receipt
        totalPrice={totalPrice}
        orderDetails={orderDetails}
        orderId={orderId}
        paymentDate={paymentDate}
        usern_name={usern_name || "guest"}
        usern_email={usern_email || "not found"}
        ref={componentRef}
        handlePrint={handlePrint}
      />
    </>
  );
};
