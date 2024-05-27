import React from "react";
import Navbar from "../../Layouts/Navbar";
import Sidebar from "../../Layouts/Sidebar";
import { SidebarToggler } from "../../ContextHooks/sidebarToggler";
import DashboardContent from "../../Layouts/DashboardContent";
import style from "./DashboardHomepage.module.scss";
import Footer from "../../Layouts/Footer";
export default function DashboardHomepage() {
  return (
    <>
      <SidebarToggler>
        <div className={style.DashboardHomepage}>
          <Navbar />
          <Sidebar />
          <DashboardContent />
        </div>
        <Footer />
      </SidebarToggler>
    </>
  );
}
