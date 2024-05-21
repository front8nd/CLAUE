import React from "react";
import Navbar from "../../Layouts/Navbar";
import Sidebar from "../../Layouts/Sidebar";
import { SidebarToggler } from "../../ContextHooks/sidebarToggler";
import style from "./TrackOrder.module.scss";
import TrackOrderDetails from "../../Components/TrackOrderDetails";
export default function TrackOrder() {
  return (
    <div className={style.TrackOrder}>
      <SidebarToggler>
        <Navbar />
        <Sidebar />
        <TrackOrderDetails />
      </SidebarToggler>
    </div>
  );
}
