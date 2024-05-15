import React from "react";
import { Link } from "react-router-dom";
export default function OrderCompleteHeader() {
  return (
    <div className="cart-header">
      <div className="cart-bg">
        <h3>Order Placed Successfully</h3>
        <div className="cart-content">
          <Link to={"/"} className="bg-title">
            Home
          </Link>
          <Link to={"/checkout/"} className="bg-cur-page">
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
