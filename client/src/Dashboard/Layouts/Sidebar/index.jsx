import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import style from "./Sidebar.module.scss";
import { useSidebarToggler } from "../../ContextHooks/sidebarToggler";
import { RiMenuFoldLine } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import { MdOutlineInventory2 } from "react-icons/md";
import { GoStack } from "react-icons/go";
import { FiShoppingCart } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { VscSymbolMisc } from "react-icons/vsc";
import { IoIosArrowDown } from "react-icons/io";
import { FiFacebook } from "react-icons/fi";
import { CiTwitter } from "react-icons/ci";
import { FiLinkedin } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";
import ContactSVG from "../../Assets/contact.svg";
import Logo from "../../Assets/logo.png";

export default function Sidebar() {
  const url = useLocation();
  const urlParent = url.pathname.split("/").filter(Boolean)[0];
  const urlSub = url.pathname.split("/").filter(Boolean)[1];
  const { sidebarVisible, toggleSidebar } = useSidebarToggler();
  const [expandMenuItem, setExpandMenuItem] = useState(urlParent);
  const [expandSubMenuItem, setExpandSubMenuItem] = useState(urlSub);

  const handleMenuItemClick = (menuItem) => {
    setExpandMenuItem(menuItem);
  };

  const handleSubMenuItemClick = (subMenuItem) => {
    setExpandSubMenuItem(subMenuItem);
  };

  if (!sidebarVisible) {
    return null;
  }

  return (
    <div className={style.sidebar}>
      <div className={style.sidebarHeaderContainer}>
        <div className={style.sidebarHeader}>
          <img src={Logo} alt="Logo" style={{ marginLeft: "20px" }} />
          <RiMenuFoldLine
            onClick={() => toggleSidebar()}
            className={style.sidebarCloseIcon}
          />
        </div>
      </div>
      <div className={style.sidebarMainMenu}>
        <div className={style.sidebarMenuLabel}>MAIN HOME</div>
        <Link className={style.SidebarLink} to="/Admin/">
          <div
            onClick={() => handleMenuItemClick("Admin")}
            className={
              expandMenuItem === "Admin"
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
                to="/Products/AddProducts/"
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
                to="/Products/AllProducts/"
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
                to="/Category/AddCategory/"
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
                to="/Category/AllCategory/"
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
                to="/Attributes/AddAttributes/"
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
                to="/Attributes/AllAttributes/"
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
                to="/Orders/AllOrders/"
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
                to="/Orders/TrackOrder/"
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
              <FaRegUser className={style.sidebarMenuIcon} />
              <span>Users</span>
            </div>
          </div>
        </Link>
        <div style={{ margin: "10px" }} className={style.sidebarMenuLabel}>
          Contact Us
        </div>
        <div className={style.sidebarSocial}>
          <div className={style.sidebarSocialIcon}>
            <FiFacebook />
          </div>
          <div className={style.sidebarSocialIcon}>
            <CiTwitter />
          </div>
          <div className={style.sidebarSocialIcon}>
            <FiLinkedin />
          </div>
          <div className={style.sidebarSocialIcon}>
            <FaInstagram />
          </div>
        </div>
        <div className={style.sidebarContact}>
          <img src={ContactSVG} height="250px" width="150px" alt="Contact" />
          <h6 className={style.sidebarContactHeading}>Hi, how can we help?</h6>
          <p className={style.sidebarContactContent}>
            Contact us if you have any assistance, we will contact you as soon
            as possible
          </p>
          <button className={style.sidebarButton}>Contact</button>
        </div>
      </div>
    </div>
  );
}
