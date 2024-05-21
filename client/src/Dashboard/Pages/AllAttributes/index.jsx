import React from "react";
import Navbar from "../../Layouts/Navbar";
import Sidebar from "../../Layouts/Sidebar";
import { SidebarToggler } from "../../ContextHooks/sidebarToggler";
import style from "./AllAttributes.module.scss";
import AllAttributesDetails from "../../Components/AllAttributesDetails";
export default function AllAttributes() {
  return (
    <div className={style.AllAttributes}>
      <SidebarToggler>
        <Navbar />
        <Sidebar />
        <AllAttributesDetails />
      </SidebarToggler>
    </div>
  );
}
