import React, { useEffect, useState } from "react";
import "./style.css";
import {
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";
const auth = getAuth();
export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [BtnLoading, setBtnLoading] = useState("Submit Email");
  const changeHandler = (e) => {
    setEmail(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    setBtnLoading("Please Wait..");
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setStatus([
          "Password reset email has been sent to your registered email address, please check your Inbox",
        ]);
        setBtnLoading("Password Reset Email Sent");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setStatus(`Error Code: ${errorCode}, Error Details: ${errorMessage}`);
        setBtnLoading("Password Reset Failed");
      });
    setTimeout(() => {
      setBtnLoading("Reset Password");
    }, [3000]);
  };
  console.log(status);
  useEffect(() => {}, [email]);
  return (
    <div className="reset-password">
      <label className="login-input-label ">Email Address</label>
      <input
        name="email"
        required
        value={email}
        onChange={changeHandler}
        placeholder="user@xyz.com"
        className="login-input-field add-margin"
      ></input>
      {status != [] ? (
        <div
          style={{
            color: "red",
            fontSize: "12px",
            fontStyle: "italic",
            marginBottom: "10px",
          }}
        >
          {status}
        </div>
      ) : (
        ""
      )}
      <button
        type="submit"
        onClick={submitHandler}
        className="login-input-signin add-margin"
      >
        {BtnLoading}
      </button>
    </div>
  );
}
