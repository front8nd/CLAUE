import React from "react";
import { Link } from "react-router-dom";
export default function ProfileHeader({ userDetails }) {
  return (
    <div className="cart-header">
      <div className="cart-bg">
        <h3>
          {`${userDetails.firstName.toUpperCase()}  ${userDetails.lastName.toUpperCase()}`}
        </h3>
        <div className="cart-content">
          <Link to={"/"} className="bg-title">
            Home
          </Link>
          <Link to={"/Profile/"} className="bg-cur-page">
            Profile
          </Link>
        </div>
      </div>
    </div>
  );
}
