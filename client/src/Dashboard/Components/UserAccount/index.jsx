import React, { useState } from "react";
import style from "./UserAccount.module.scss";
import { AiOutlineUser } from "react-icons/ai";
import { TbLogout2 } from "react-icons/tb";

export default function UserAccount({ userDetails }) {
  const [showAccount, setShowAccount] = useState(false);
  return (
    <div className={style.alignAdmin}>
      <span></span>
      <div
        onClick={() => {
          setShowAccount(!showAccount);
        }}
        className={style.UserAccount}
      >
        <div>
          <img
            src="/src/Dashboard/Assets/user-1.png"
            className={style.adminPicture}
          ></img>
        </div>
        <div className={style.adminDetails}>
          <label
            className={style.adminUsername}
          >{`${userDetails.firstName} ${userDetails.lastName} `}</label>
          <label className={style.adminRole}>Admin</label>
        </div>
        {showAccount && (
          <div className={style.userAccountMenu}>
            <ul>
              <li>
                <AiOutlineUser className={style.UserAccountMenuIcon} />
                Account
              </li>
              <li>
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
