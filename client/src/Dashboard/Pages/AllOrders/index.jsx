import React from "react";
import Navbar from "../../Layouts/Navbar";
import Sidebar from "../../Layouts/Sidebar";
import { SidebarToggler } from "../../ContextHooks/sidebarToggler";
import style from "./AllOrders.module.scss";
import AllOrdersDetails from "../../Components/AllOrdersDetails";
export default function AllOrders() {
  return (
    <div className={style.Orders}>
      <SidebarToggler>
        <Navbar />
        <Sidebar />
        <AllOrdersDetails />
      </SidebarToggler>
    </div>
  );
}
