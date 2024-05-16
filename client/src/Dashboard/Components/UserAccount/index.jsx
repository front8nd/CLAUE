import React from "react";
import style from "./UserAccount.module.scss";
export default function UserAccount() {
  return (
    <div className={style.alignAdmin}>
      <span></span>
      <div className={style.UserAccount}>
        <div>
          <img
            src="/src/Dashboard/Assets/user-1.png"
            className={style.adminPicture}
          ></img>
        </div>
        <div className={style.adminDetails}>
          <label className={style.adminUsername}>Kristine Watson</label>
          <label className={style.adminRole}>Admin</label>
        </div>
      </div>
    </div>
  );
}
