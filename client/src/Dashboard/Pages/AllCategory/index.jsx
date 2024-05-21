import React from "react";
import Navbar from "../../Layouts/Navbar";
import Sidebar from "../../Layouts/Sidebar";
import { SidebarToggler } from "../../ContextHooks/sidebarToggler";
import style from "./AllCategory.module.scss";
import AllCategoryDetails from "../../Components/AllCategoryDetails";
export default function AllCategory() {
  return (
    <div className={style.AllCategory}>
      <SidebarToggler>
        <Navbar />
        <Sidebar />
        <AllCategoryDetails />
      </SidebarToggler>
    </div>
  );
}
