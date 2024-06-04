import React from "react";
import Navbar from "../../Layouts/Navbar";
import Sidebar from "../../Layouts/Sidebar";
import { SidebarToggler } from "../../ContextHooks/sidebarToggler";
import style from "./EditUser.module.scss";
import EditUserDetails from "../../Components/EditUserDetails";
export default function AllUsers() {
  return (
    <div className={style.Users}>
      <SidebarToggler>
        <Navbar />
        <Sidebar />
        <EditUserDetails />
      </SidebarToggler>
    </div>
  );
}
