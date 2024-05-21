import React from "react";
import Navbar from "../../Layouts/Navbar";
import Sidebar from "../../Layouts/Sidebar";
import { SidebarToggler } from "../../ContextHooks/sidebarToggler";
import style from "./Users.module.scss";
import UsersDetails from "../../Components/UsersDetails";
export default function Users() {
  return (
    <div className={style.Users}>
      <SidebarToggler>
        <Navbar />
        <Sidebar />
        <UsersDetails />
      </SidebarToggler>
    </div>
  );
}
