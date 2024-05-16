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
import { useMenuItemToggler } from "../../ContextHooks/MenuItemToggler";
export default function Sidebar() {
  const { sidebarVisible, toggleSidebar } = useSidebarToggler();
  const { MenuItemVisible, toggleMenuItem } = useMenuItemToggler();

  if (!sidebarVisible) {
    return null;
  }

  return (
    <div className={style.sidebar}>
      <div className={style.sidebarHeaderContainer}>
        <div className={style.sidebarHeader}>
          <img src="src/Dashboard/Assets/logo.png" alt="Logo"></img>
          <RiMenuFoldLine
            onClick={() => toggleSidebar()}
            className={style.sidebarCloseIcon}
          />
        </div>
      </div>
      <div className={style.sidebarMainMenu}>
        <div
          onClick={() => {
            toggleMenuItem();
          }}
          className={style.sidebarMenuActive}
        >
          <div
            className={
              MenuItemVisible === true
                ? `${style.sidebarMenuItemActive}`
                : `${style.sidebarMenuItem}`
            }
          >
            <RxDashboard className={style.sidebarMenuIcon} />
            <span>Dashboard</span>
          </div>
        </div>
        <div className={style.sidebarMenu}>
          <div className={style.sidebarMenuItem}>
            <MdOutlineInventory2 className={style.sidebarMenuIcon} />
            <span>Products</span>
          </div>
          <IoIosArrowDown className={style.arrowIcon} />
        </div>
        <div className={style.sidebarMenu}>
          <div className={style.sidebarMenuItem}>
            <GoStack className={style.sidebarMenuIcon} />
            <span>Category</span>
          </div>
          <IoIosArrowDown className={style.arrowIcon} />
        </div>
        <div className={style.sidebarMenu}>
          <div className={style.sidebarMenuItem}>
            <VscSymbolMisc className={style.sidebarMenuIcon} />
            <span>Misc</span>
          </div>
          <IoIosArrowDown className={style.arrowIcon} />
        </div>
        <div className={style.sidebarMenu}>
          <div className={style.sidebarMenuItem}>
            <CiUser className={style.sidebarMenuIcon} />
            <span>Users</span>
          </div>
          <IoIosArrowDown className={style.arrowIcon} />
        </div>
        <div className={style.sidebarMenu}>
          <div className={style.sidebarMenuItem}>
            <FiShoppingCart className={style.sidebarMenuIcon} />
            <span>Orders</span>
          </div>
          <IoIosArrowDown className={style.arrowIcon} />
        </div>
      </div>
    </div>
  );
}
