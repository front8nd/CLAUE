import React, { useState } from "react";
import style from "./ProfileLayout.module.scss";
import { CgProfile } from "react-icons/cg";
import { MdHistory } from "react-icons/md";
import { MdFindInPage } from "react-icons/md";

import UserProfile from "../../components/UserProfile";

export default function ProfileLayout() {
  const [active, setActive] = useState("Profile");
  return (
    <div className={style.profileContainer}>
      <div className={style.sidebar}>
        <div
          onClick={() => setActive("Profile")}
          className={
            active === "Profile" ? style.sidebarMenuActive : style.sidebarMenu
          }
        >
          <i>
            <CgProfile />
          </i>
          <p>Profile</p>
        </div>
        <div
          onClick={() => setActive("TrackOrder")}
          className={
            active === "TrackOrder"
              ? style.sidebarMenuActive
              : style.sidebarMenu
          }
        >
          <i>
            <MdFindInPage />
          </i>
          <p>Track Order</p>
        </div>
        <div
          onClick={() => setActive("OrderHistory")}
          className={
            active === "OrderHistory"
              ? style.sidebarMenuActive
              : style.sidebarMenu
          }
        >
          <i>
            <MdHistory />
          </i>
          <p>Order History</p>
        </div>
      </div>
      <div className={style.content}>
        {active === "Profile" ? <UserProfile /> : ""}
      </div>
    </div>
  );
}
