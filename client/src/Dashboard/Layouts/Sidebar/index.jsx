import React, { useState } from "react";
import style from "./Navbar.module.scss";
import { useSidebarToggler } from "../../ContextHooks/sidebarToggler";
import { RiMenuFoldLine } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import { MdOutlineInventory2 } from "react-icons/md";
import { GoStack } from "react-icons/go";
import { FiShoppingCart } from "react-icons/fi";
import { CiUser } from "react-icons/ci";
import { VscSymbolMisc } from "react-icons/vsc";
import { IoIosArrowDown } from "react-icons/io";
export default function Sidebar() {
  const { sidebarVisible, toggleSidebar } = useSidebarToggler();
  const [expandMenuItem, setExpandMenuItem] = useState("Dashboard");

  if (!sidebarVisible) {
    return null;
  }

  return (
    <div className={style.sidebar}>
      <div className={style.sidebarHeaderContainer}>
        <div className={style.sidebarHeader}>
          <img src="/src/Dashboard/Assets/logo.png" alt="Logo"></img>
          <RiMenuFoldLine
            onClick={() => toggleSidebar()}
            className={style.sidebarCloseIcon}
          />
        </div>
      </div>
      <div className={style.sidebarMainMenu}>
        <div className={style.sidebarMenuLabel}>MAIN HOME</div>
        <div
          onClick={() => {
            setExpandMenuItem("Dashboard");
          }}
          className={
            expandMenuItem === "Dashboard"
              ? style.sidebarMenuActive
              : style.sidebarMenu
          }
        >
          <div className={style.sidebarMenuItem}>
            <RxDashboard className={style.sidebarMenuIcon} />
            <span>Dashboard</span>
          </div>
        </div>
        <div className={style.sidebarMenuLabel}>All Pages</div>

        <div
          onClick={() => {
            setExpandMenuItem("Products");
          }}
          className={
            expandMenuItem === "Products"
              ? style.sidebarMenuActive
              : style.sidebarMenu
          }
        >
          <div className={style.sidebarMenuItem}>
            <MdOutlineInventory2 className={style.sidebarMenuIcon} />
            <span>Products</span>
          </div>
          <IoIosArrowDown className={style.arrowIcon} />
        </div>
        {expandMenuItem === "Products" ? (
          <div className={style.sidebarSubMenu}>
            <ul>
              <li className={style.sidebarSubMenuList}>All Products</li>
              <li className={style.sidebarSubMenuList}>Add Products</li>
            </ul>
          </div>
        ) : (
          ""
        )}
        <div
          onClick={() => {
            setExpandMenuItem("Category");
          }}
          className={
            expandMenuItem === "Category"
              ? style.sidebarMenuActive
              : style.sidebarMenu
          }
        >
          <div className={style.sidebarMenuItem}>
            <GoStack className={style.sidebarMenuIcon} />
            <span>Category</span>
          </div>
          <IoIosArrowDown className={style.arrowIcon} />
        </div>
        {expandMenuItem === "Category" ? (
          <div className={style.sidebarSubMenu}>
            <ul>
              <li className={style.sidebarSubMenuList}>All Products</li>
              <li className={style.sidebarSubMenuList}>Add Products</li>
            </ul>
          </div>
        ) : (
          ""
        )}
        <div
          onClick={() => {
            setExpandMenuItem("Attributes");
          }}
          className={
            expandMenuItem === "Attributes"
              ? style.sidebarMenuActive
              : style.sidebarMenu
          }
        >
          <div className={style.sidebarMenuItem}>
            <VscSymbolMisc className={style.sidebarMenuIcon} />
            <span>Attributes</span>
          </div>
          <IoIosArrowDown className={style.arrowIcon} />
        </div>
        {expandMenuItem === "Attributes" ? (
          <div className={style.sidebarSubMenu}>
            <ul>
              <li className={style.sidebarSubMenuList}>All Products</li>
              <li className={style.sidebarSubMenuList}>Add Products</li>
            </ul>
          </div>
        ) : (
          ""
        )}
        <div
          onClick={() => {
            setExpandMenuItem("Users");
          }}
          className={
            expandMenuItem === "Users"
              ? style.sidebarMenuActive
              : style.sidebarMenu
          }
        >
          <div className={style.sidebarMenuItem}>
            <CiUser className={style.sidebarMenuIcon} />
            <span>Users</span>
          </div>
          <IoIosArrowDown className={style.arrowIcon} />
        </div>
        {expandMenuItem === "Users" ? (
          <div className={style.sidebarSubMenu}>
            <ul>
              <li className={style.sidebarSubMenuList}>All Products</li>
              <li className={style.sidebarSubMenuList}>Add Products</li>
            </ul>
          </div>
        ) : (
          ""
        )}
        <div
          onClick={() => {
            setExpandMenuItem("Orders");
          }}
          className={
            expandMenuItem === "Orders"
              ? style.sidebarMenuActive
              : style.sidebarMenu
          }
        >
          <div className={style.sidebarMenuItem}>
            <FiShoppingCart className={style.sidebarMenuIcon} />
            <span>Orders</span>
          </div>
          <IoIosArrowDown className={style.arrowIcon} />
        </div>
        {expandMenuItem === "Orders" ? (
          <div className={style.sidebarSubMenu}>
            <ul>
              <li className={style.sidebarSubMenuList}>All Products</li>
              <li className={style.sidebarSubMenuList}>Add Products</li>
            </ul>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
