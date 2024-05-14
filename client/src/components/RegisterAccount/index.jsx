import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
export default function RegisterAccount() {
  return (
    <div className="register-account">
      <h3 className="register-heading">NEW CUSTOMERS</h3>
      <p className="register-desc">
        By creating an account with our store, you will be able to move through
        the checkout process faster, store multiple shipping addresses, view and
        track your orders in your account and more.
      </p>
      <Link to={"/register/"}>
        <button className="create-new-account">Create an Account</button>
      </Link>
    </div>
  );
}
