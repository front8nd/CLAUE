import React, { useEffect, useState } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { userLoggedIn } from "../../Redux/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import ResetPassword from "../ResetPassword";
export default function LoginAccount() {
  const [toast, setToast] = useState(false);
  const [loginMSG, setloginMSG] = useState("");
  const [btn, setBtn] = useState("Sign In");
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setloginMSG("");
    setBtn("Signing In..");
    try {
      await signInWithEmailAndPassword(auth, user.email, user.password);
      dispatch(userLoggedIn(true));
      setloginMSG("Logged In Successfully");
      navigate("/");
    } catch (error) {
      setloginMSG(`Login Failed: ${error}`);
      console.log(error);
    }
    setBtn("Sign In");
  };
  const [showResetPassword, setShowResetPassword] = useState(false);
  if (showResetPassword) {
    return (
      <div>
        <ResetPassword />
        <button
          className="login-input-signin btn-width"
          onClick={() => {
            setShowResetPassword(false);
          }}
        >
          Back to Login Page
        </button>
      </div>
    );
  }
  return (
    <div className="login-account-container">
      {toast && (
        <div
          onClick={() => {
            setToast(false);
          }}
        >
          <ToastSuccess />
        </div>
      )}
      <div className="login-details">
        <h3 className="login-d-heading">REGISTERED CUSTOMERS</h3>
        <p className="login-d-subheading">
          If you have an account, sign in with your email address.
        </p>
        <form onSubmit={submitHandler} className="login-input">
          <label className="login-input-label">Email Address</label>
          <input
            name="email"
            required
            value={user.email}
            onChange={changeHandler}
            className="login-input-field"
          ></input>
          <label className="login-input-label">Password</label>
          <input
            name="password"
            required
            value={user.password}
            onChange={changeHandler}
            className="login-input-field"
          ></input>
          <div className="tos-agree">
            <input
              className="tos-btn"
              type="radio"
              value="agree"
              defaultChecked
            ></input>
            <label className="tos-content">
              By using this form you agree with the storage and handling of your
              data by this website.
            </label>
          </div>
          <div className="login-input-btns">
            <button type="submit" className="login-input-signin">
              {btn}
            </button>
            <button
              onClick={() => {
                setShowResetPassword(true);
              }}
              className="login-input-forgot"
            >
              Forgot Your Password?
            </button>
          </div>
          <div className="login-failed-msg">{loginMSG}</div>
        </form>
      </div>
    </div>
  );
}
