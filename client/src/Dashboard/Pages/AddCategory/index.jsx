import React from "react";
import Navbar from "../../Layouts/Navbar";
import Sidebar from "../../Layouts/Sidebar";
import { SidebarToggler } from "../../ContextHooks/sidebarToggler";
import style from "./AddCategory.module.scss";
import AddCategoryDetails from "../../Components/AddCategoryDetails";
export default function AddCategory() {
  return (
    <div className={style.AddCategory}>
      <SidebarToggler>
        <Navbar />
        <Sidebar />
        <AddCategoryDetails />
      </SidebarToggler>
    </div>
  );
}
