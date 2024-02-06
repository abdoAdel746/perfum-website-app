import React from "react";
import { Helmet } from "react-helmet";
import { AiOutlineClose } from "react-icons/ai";
import "./Failed.scss";
import {  useNavigate } from "react-router-dom";

export const Failed = () => {
  const navigate = useNavigate();

  return (
    <div className="failed">
      <Helmet>
        <title>payment failed</title>
      </Helmet>
      <div className="failed_up">
        <AiOutlineClose />
        <h1>Payment Failed!</h1>
        <h2>stripe error</h2>
      </div>
      <button
        className="print-button"
        onClick={() => navigate(`/Checkout/place_order`)}
      >
        try again
      </button>
    </div>
  );
};
