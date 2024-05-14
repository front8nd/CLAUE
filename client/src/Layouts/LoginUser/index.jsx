import React from "react";
import RegisterAccount from "../../components/RegisterAccount";
import LoginAccount from "../../components/LoginAccount";
import "./style.css";
import LoginHeader from "../../components/LoginHeader";
import { useDispatch, useSelector } from "react-redux";

export default function LoginUser() {
  const isUserLoggedIn = useSelector((state) => state.User.users);
  return (
    <div className="login-page-container">
      <LoginHeader />
      {isUserLoggedIn === false ? (
        <div className="login-page">
          <LoginAccount />
          <RegisterAccount />
        </div>
      ) : (
        <div className="already-logged-in">
          <p className="already-logged-in-msg">User Already Logged In</p>
        </div>
      )}
    </div>
  );
}
