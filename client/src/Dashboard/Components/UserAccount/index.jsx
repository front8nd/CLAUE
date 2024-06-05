import React, { useState } from "react";
import style from "./UserAccount.module.scss";
import { AiOutlineUser } from "react-icons/ai";
import { TbLogout2 } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { userLoggedIn } from "../../../Redux/UserSlice";
import { auth } from "../../../firebase";
import { useNavigate } from "react-router-dom";
export default function UserAccount() {
  const [showAccount, setShowAccount] = useState(false);
  const userDetails = useSelector((state) => state.User.userDetail);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await auth.signOut();
      dispatch(userLoggedIn(false));
      localStorage.clear();
      navigate("/");
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={style.alignAdmin}>
      <div
        onClick={() => {
          setShowAccount(!showAccount);
        }}
        className={style.UserAccount}
      >
        <div>
          <img
            src={userDetails.avatar}
            alt="avatar"
            className={style.adminPicture}
          ></img>
        </div>
        <div className={style.adminDetails}>
          <label
            className={style.adminUsername}
          >{`${userDetails.firstName}`}</label>
          <label className={style.adminRole}>{userDetails.role}</label>
        </div>
        {showAccount && (
          <div className={style.userAccountMenu}>
            <ul>
              <li>
                <AiOutlineUser className={style.UserAccountMenuIcon} />
                Account
              </li>
              <li onClick={submitHandler}>
                <TbLogout2 className={style.UserAccountMenuIcon} />
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
