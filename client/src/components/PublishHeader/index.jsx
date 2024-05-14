import React from "react";
import { Link } from "react-router-dom";
export default function PublishHeader() {
  return (
    <div className="cart-header">
      <div className="cart-bg">
        <h3>Publish Content</h3>
        <div className="cart-content">
          <Link to={"/"} className="bg-title">
            Home
          </Link>
          <Link to={"/publish/"} className="bg-cur-page">
            Publish
          </Link>
        </div>
      </div>
    </div>
  );
}
