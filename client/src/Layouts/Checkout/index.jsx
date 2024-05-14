import React from "react";
import "./style.css";
import CheckoutHeader from "../../components/CheckoutHeader";
import ShippingAddress from "../../components/ShippingAddress";
import OrderSummary from "../../components/OrderSummary";
import PaymentMethods from "../../components/PaymentMethods";

export default function CheckoutLayout() {
  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <CheckoutHeader />
      </div>
      <div className="checkout-details-container">
        <div className="shipping-address">
          <ShippingAddress />
        </div>
        <div className="payment-method">
          <PaymentMethods />
        </div>
        <div className="order-summary">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}
