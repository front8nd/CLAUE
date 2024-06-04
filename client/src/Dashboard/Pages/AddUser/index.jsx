import React from "react";
import Navbar from "../../Layouts/Navbar";
import Sidebar from "../../Layouts/Sidebar";
import { SidebarToggler } from "../../ContextHooks/sidebarToggler";
import AddUserDetails from "../../Components/AddUserDetails";
import style from "./AddUser.module.scss";
export default function AddUser() {
  return (
    <div className={style.Users}>
      <SidebarToggler>
        <Navbar />
        <Sidebar />
        <AddUserDetails />
      </SidebarToggler>
    </div>
  );
}
