import React, { useState } from "react";
import style from "./ProfileLayout.module.scss";
import { CgProfile } from "react-icons/cg";
import { MdHistory } from "react-icons/md";
import { MdFindInPage } from "react-icons/md";
import { TbPasswordUser } from "react-icons/tb";
import { AiOutlineUserDelete } from "react-icons/ai";
import UserProfile from "../../Components/UserProfile";
import UserPassword from "../../Components/UserPassword";
import UserDelete from "../../Components/UserDelete";
import OrderHistory from "../../Components/OrderHistory";

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
          onClick={() => setActive("UserPassword")}
          className={
            active === "UserPassword"
              ? style.sidebarMenuActive
              : style.sidebarMenu
          }
        >
          <i>
            <TbPasswordUser />
          </i>
          <p>Change Password</p>
        </div>
        <div
          onClick={() => setActive("UserDelete")}
          className={
            active === "UserDelete"
              ? style.sidebarMenuActive
              : style.sidebarMenu
          }
        >
          <i>
            <AiOutlineUserDelete />
          </i>
          <p>Delete Account</p>
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
        {active === "UserPassword" ? <UserPassword /> : ""}
        {active === "UserDelete" ? <UserDelete /> : ""}
        {active === "OrderHistory" ? <OrderHistory /> : ""}
      </div>
    </div>
  );
}
