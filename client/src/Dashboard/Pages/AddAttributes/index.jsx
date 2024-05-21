import React from "react";
import Navbar from "../../Layouts/Navbar";
import Sidebar from "../../Layouts/Sidebar";
import { SidebarToggler } from "../../ContextHooks/sidebarToggler";
import style from "./AddAttributes.module.scss";
import AddAttributesDetails from "../../Components/AddAttributesDetails";
export default function AddAttributes() {
  return (
    <div className={style.AddAttributes}>
      <SidebarToggler>
        <Navbar />
        <Sidebar />
        <AddAttributesDetails />
      </SidebarToggler>
    </div>
  );
}
