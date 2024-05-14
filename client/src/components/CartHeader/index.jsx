import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
export default function CartHeader() {
  return (
    <div className="cart-header">
      <div className="cart-bg">
        <h3>Shopping Cart</h3>
        <div className="cart-content">
          <Link to={"/"} className="bg-title">
            Home
          </Link>
          <Link to={"/cart/"} className="bg-cur-page">
            Shopping Cart
          </Link>
        </div>
      </div>
    </div>
  );
}
