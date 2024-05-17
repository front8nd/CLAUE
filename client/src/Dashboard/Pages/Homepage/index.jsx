import React from "react";
import Navbar from "../../Layouts/Navbar";
import Sidebar from "../../Layouts/Sidebar";
import { SidebarToggler } from "../../ContextHooks/sidebarToggler";
import DashboardContent from "../../Layouts/DashboardContent";
import style from "./DashboardHomepage.module.scss";
export default function DashboardHomepage() {
  return (
    <div className={style.DashboardHomepage}>
      <SidebarToggler>
        <Navbar />
        <Sidebar />
        <DashboardContent />
      </SidebarToggler>
    </div>
  );
}
