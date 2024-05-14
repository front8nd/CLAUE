import React from "react";
import { Link } from "react-router-dom";
export default function StripeCheckoutHeader() {
  return (
    <div className="cart-header">
      <div className="cart-bg">
        <h3>Stripe Checkout</h3>
        <div className="cart-content">
          <Link to={"/"} className="bg-title">
            Home
          </Link>
          <Link to={"/StripeCheckout/"} className="bg-cur-page">
            Stripe Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
