import React from "react";
import Navbar from "../../Layouts/Navbar";
import Sidebar from "../../Layouts/Sidebar";
import { SidebarToggler } from "../../ContextHooks/sidebarToggler";
import style from "./AddProducts.module.scss";
import AddProductDetails from "../../Components/AddProductDetails";
export default function AddProducts() {
  return (
    <div className={style.AddProducts}>
      <SidebarToggler>
        <Navbar />
        <Sidebar />
        <AddProductDetails />
      </SidebarToggler>
    </div>
  );
}
