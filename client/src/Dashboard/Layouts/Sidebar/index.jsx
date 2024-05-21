import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from "./Sidebar.module.scss";
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
  const [expandSubMenuItem, setExpandSubMenuItem] = useState("");

  // Retrieve menu state from local storage
  useEffect(() => {
    const savedMenuItem = localStorage.getItem("expandMenuItem");
    const savedSubMenuItem = localStorage.getItem("expandSubMenuItem");
    if (savedMenuItem) setExpandMenuItem(savedMenuItem);
    if (savedSubMenuItem) setExpandSubMenuItem(savedSubMenuItem);
  }, []);

  // Save menu state to local storage
  const handleMenuItemClick = (menuItem) => {
    setExpandMenuItem(menuItem);
    localStorage.setItem("expandMenuItem", menuItem);
  };

  const handleSubMenuItemClick = (subMenuItem) => {
    setExpandSubMenuItem(subMenuItem);
    localStorage.setItem("expandSubMenuItem", subMenuItem);
  };

  if (!sidebarVisible) {
    return null;
  }

  return (
    <div className={style.sidebar}>
      <div className={style.sidebarHeaderContainer}>
        <div className={style.sidebarHeader}>
          <img src="/src/Dashboard/Assets/logo.png" alt="Logo" />
          <RiMenuFoldLine
            onClick={() => toggleSidebar()}
            className={style.sidebarCloseIcon}
          />
        </div>
      </div>
      <div className={style.sidebarMainMenu}>
        <div className={style.sidebarMenuLabel}>MAIN HOME</div>
        <Link className={style.SidebarLink} to="/admin/">
          <div
            onClick={() => handleMenuItemClick("Dashboard")}
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
        </Link>
        <div className={style.sidebarMenuLabel}>All Pages</div>
        <div
          onClick={() => handleMenuItemClick("Products")}
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
        {expandMenuItem === "Products" && (
          <div className={style.sidebarSubMenu}>
            <ul>
              <Link
                onClick={() => handleSubMenuItemClick("AddProducts")}
                className={
                  expandSubMenuItem === "AddProducts"
                    ? style.SidebarLinkActive
                    : style.SidebarLink
                }
                to="/AddProducts/"
              >
                <li className={style.sidebarSubMenuList}>Add New Product</li>
              </Link>
              <Link
                onClick={() => handleSubMenuItemClick("AllProducts")}
                className={
                  expandSubMenuItem === "AllProducts"
                    ? style.SidebarLinkActive
                    : style.SidebarLink
                }
                to="/AllProducts/"
              >
                <li className={style.sidebarSubMenuList}>All Products</li>
              </Link>
            </ul>
          </div>
        )}
        <div
          onClick={() => handleMenuItemClick("Category")}
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
        {expandMenuItem === "Category" && (
          <div className={style.sidebarSubMenu}>
            <ul>
              <Link
                onClick={() => handleSubMenuItemClick("AddCategory")}
                className={
                  expandSubMenuItem === "AddCategory"
                    ? style.SidebarLinkActive
                    : style.SidebarLink
                }
                to="/AddCategory/"
              >
                <li className={style.sidebarSubMenuList}>Add New Category</li>
              </Link>
              <Link
                onClick={() => handleSubMenuItemClick("AllCategory")}
                className={
                  expandSubMenuItem === "AllCategory"
                    ? style.SidebarLinkActive
                    : style.SidebarLink
                }
                to="/AllCategory/"
              >
                <li className={style.sidebarSubMenuList}>All Categories</li>
              </Link>
            </ul>
          </div>
        )}
        <div
          onClick={() => handleMenuItemClick("Attributes")}
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
        {expandMenuItem === "Attributes" && (
          <div className={style.sidebarSubMenu}>
            <ul>
              <Link
                onClick={() => handleSubMenuItemClick("AddAttributes")}
                className={
                  expandSubMenuItem === "AddAttributes"
                    ? style.SidebarLinkActive
                    : style.SidebarLink
                }
                to="/AddAttributes/"
              >
                <li className={style.sidebarSubMenuList}>Add Attributes</li>
              </Link>
              <Link
                onClick={() => handleSubMenuItemClick("AllAttributes")}
                className={
                  expandSubMenuItem === "AllAttributes"
                    ? style.SidebarLinkActive
                    : style.SidebarLink
                }
                to="/AllAttributes/"
              >
                <li className={style.sidebarSubMenuList}>All Attributes</li>
              </Link>
            </ul>
          </div>
        )}
        <div
          onClick={() => handleMenuItemClick("Orders")}
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
        {expandMenuItem === "Orders" && (
          <div className={style.sidebarSubMenu}>
            <ul>
              <Link
                onClick={() => handleSubMenuItemClick("AllOrders")}
                className={
                  expandSubMenuItem === "AllOrders"
                    ? style.SidebarLinkActive
                    : style.SidebarLink
                }
                to="/AllOrders/"
              >
                <li className={style.sidebarSubMenuList}>All Orders</li>
              </Link>
              <Link
                onClick={() => handleSubMenuItemClick("TrackOrder")}
                className={
                  expandSubMenuItem === "TrackOrder"
                    ? style.SidebarLinkActive
                    : style.SidebarLink
                }
                to="/TrackOrder/"
              >
                <li className={style.sidebarSubMenuList}>Track Order</li>
              </Link>
            </ul>
          </div>
        )}
        <Link className={style.SidebarLink} to="/Users/">
          <div
            onClick={() => handleMenuItemClick("Users")}
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
          </div>
        </Link>
      </div>
    </div>
  );
}
