import React from "react";
import "./style.css";
import CategorySidebar from "../../Layouts/CategorySidebar";
import { IoIosCloseCircle } from "react-icons/io";
import { useDispatch } from "react-redux";
import { switchSidebar } from "../../Redux/ProductsSlice";
export default function SidebarFilter() {
  const dispatch = useDispatch();
  return (
    <div className="sidebar-filter-con">
      <div className="close">
        <span></span>
        <button
          onClick={() => {
            dispatch(switchSidebar(false));
          }}
          className="close-btn"
        >
          <IoIosCloseCircle className="close-btn-icon" />
        </button>
      </div>
      <CategorySidebar />
    </div>
  );
}
