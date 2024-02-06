import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { FaCheck } from "react-icons/fa6";
import { Tooltip as ReactTooltip } from "react-tooltip";

class Receipt extends Component {
  render() {
    const {
      totalPrice,
      orderDetails,
      orderId,
      paymentDate,
      usern_name,
      usern_email,
      handlePrint,
    } = this.props;

    return (
      <div className="sucess">
        <Helmet>
          <title>success</title>
        </Helmet>
        <div className="sucess_up">
          <FaCheck />
          <h1>Payment Success!</h1>
          <h2>{totalPrice} USD.</h2>
        </div>
        <div className="success_down">
          {orderDetails ? (
            <div className="box_success">
              <div className="box_success__info">
                <span>Ref Number</span>
                <span>{orderId}</span>
              </div>
              <div className="box_success__info">
                <span>Payment Time</span>
                <span>{paymentDate}</span>
              </div>
              <div className="box_success__info">
                <span>customer name</span>
                <span>{usern_name}</span>
              </div>
              <div className="box_success__info">
                <span>payment email</span>
                <span>{usern_email}</span>
              </div>
              <div className="box_success__info">
                <span>payment method</span>
                <span>stripe</span>
              </div>
            </div>
          ) : (
            <h2>Loading order details...</h2>
          )}
        </div>
        <ReactTooltip
          id="print_b"
          place="bottom"
          data-tooltip-variant="light"
          content="react-to-print"
        />
        <button
          data-tooltip-id="print_b"
          onClick={handlePrint}
          className="print-button"
        >
          Print Receipt
        </button>
      </div>
    );
  }
}

export default Receipt;
