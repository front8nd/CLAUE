import React from "react";
import Navbar from "../../Layouts/Navbar";
import Sidebar from "../../Layouts/Sidebar";
import { SidebarToggler } from "../../ContextHooks/sidebarToggler";
import style from "./AllProducts.module.scss";
import AllProductsDetails from "../../Components/AllProductsDetails";
export default function AllProducts() {
  return (
    <div className={style.AllProducts}>
      <SidebarToggler>
        <Navbar />
        <Sidebar />
        <AllProductsDetails />
      </SidebarToggler>
    </div>
  );
}
