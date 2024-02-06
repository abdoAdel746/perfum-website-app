import React, { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useReactToPrint } from "react-to-print";
import "./oldorders.scss";
import { Helmet } from "react-helmet";
import Receipt from "../success/Receipt";
import { useNavigate } from "react-router-dom";

export const Oldorder = () => {
  const orders = useSelector((state) => state.paid.orders);
  const componentRef = useRef();
  const navigate = useNavigate();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const dispatch = useDispatch();
  const orderIds = useSelector((state) => state.paid.orders);
  console.log(orderIds);

  return (
    <>
      <div className="main">
        <h1>Previous Orders</h1>
        <div className="location">
          <h2>
            <span onClick={() => navigate(`/`)}>Home</span>/ Orders
          </h2>
        </div>
      </div>
      <div className="oldorders">
        <Helmet>
          <title>Previous Orders</title>
        </Helmet>

        {orderIds.length < 1 ? (
          <p className="err_ord">No orders found</p>
        ) : (
          orders.map((order, index) => (
            <div key={index} className="oldorders__items">
              <h3>Order {index + 1}</h3>
              <div className="box">
                <div className="left">
                  {order.items.map((item) => (
                    <div key={item.id} className="left_order">
                      <img src={item.product_image} alt={item.product_name} />
                      <p className="">{item.product_name}</p>
                    </div>
                  ))}
                </div>
                <div className="right">
                  <Receipt
                    totalPrice={order.totalPrice}
                    orderDetails={"orderDetails"}
                    orderId={order.orderId}
                    paymentDate={order.paymentDate}
                    usern_name={order.usern_name}
                    usern_email={order.usern_email}
                    ref={componentRef}
                    handlePrint={handlePrint}
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};
