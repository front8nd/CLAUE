import React, { useState } from "react";
import style from "./UserAccount.module.scss";
import { AiOutlineUser } from "react-icons/ai";
import { TbLogout2 } from "react-icons/tb";

export default function UserAccount({ userDetails }) {
  const [showAccount, setShowAccount] = useState(false);
  return (
    <div className={style.alignAdmin}>
      <div
        onClick={() => {
          setShowAccount(!showAccount);
        }}
        className={style.UserAccount}
      >
        <div>
          <img src={userDetails.avatar} className={style.adminPicture}></img>
        </div>
        <div className={style.adminDetails}>
          <label
            className={style.adminUsername}
          >{`${userDetails.firstName}  `}</label>
          <label className={style.adminRole}>{userDetails.role}</label>
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
