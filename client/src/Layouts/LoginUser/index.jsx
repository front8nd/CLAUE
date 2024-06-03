import React, { useEffect } from "react";
import RegisterAccount from "../../components/RegisterAccount";
import LoginAccount from "../../components/LoginAccount";
import "./style.css";
import LoginHeader from "../../components/LoginHeader";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLoggedIn } from "../../Redux/UserSlice";

export default function LoginUser() {
  const isUserLoggedIn = useSelector((state) => state.User.users);
  const navigation = useNavigate();
  useEffect(() => {
    if (isUserLoggedIn) navigation("/Admin/");
  }, [userLoggedIn]);
  return (
    <div className="login-page-container">
      <LoginHeader />
      <div className="login-page">
        <LoginAccount />
        <RegisterAccount />
      </div>
    </div>
  );
}
