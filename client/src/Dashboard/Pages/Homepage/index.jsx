import React from "react";
import Navbar from "../../Layouts/Navbar";
import Sidebar from "../../Layouts/Sidebar";
import { SidebarToggler } from "../../ContextHooks/sidebarToggler";

export default function DashboardHomepage() {
  return (
    <div>
      <SidebarToggler>
        <Navbar />
        <Sidebar />
      </SidebarToggler>
    </div>
  );
}
