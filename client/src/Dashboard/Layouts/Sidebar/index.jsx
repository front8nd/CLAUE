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
import { IoHomeOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { TbPasswordUser } from "react-icons/tb";
import { AiOutlineUserDelete } from "react-icons/ai";
import { MdHistory } from "react-icons/md";
import { useSelector } from "react-redux";

export default function Sidebar() {
  const url = useLocation();
  const urlParent = url.pathname.split("/").filter(Boolean)[0];
  const urlSub = url.pathname.split("/").filter(Boolean)[1];
  const { sidebarVisible, toggleSidebar } = useSidebarToggler();
  const [expandMenuItem, setExpandMenuItem] = useState(urlParent);
  const [expandSubMenuItem, setExpandSubMenuItem] = useState(urlSub);
  const userDetails = useSelector((state) => state.User.userDetail);

  const handleMenuItemClick = (menuItem) => {
    setExpandMenuItem(menuItem);
  };

  const handleSubMenuItemClick = (subMenuItem) => {
    setExpandSubMenuItem(subMenuItem);
  };

  if (!sidebarVisible) {
    return null;
  }

  if (userDetails.role === "user")
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
          <Link className={style.SidebarLink} to="/">
            <div
              onClick={() => handleMenuItemClick("homepage")}
              className={style.sidebarMenu}
            >
              <div className={style.sidebarMenuItem}>
                <IoHomeOutline className={style.sidebarMenuIcon} />
                <span>Homepage</span>
              </div>
            </div>
          </Link>
          <Link className={style.SidebarLink} to="/profile">
            <div
              onClick={() => handleMenuItemClick("profile")}
              className={
                expandMenuItem === "profile"
                  ? style.sidebarMenuActive
                  : style.sidebarMenu
              }
            >
              <div className={style.sidebarMenuItem}>
                <CgProfile className={style.sidebarMenuIcon} />
                <span>Profile</span>
              </div>
            </div>
          </Link>
          <Link className={style.SidebarLink} to="/password">
            <div
              onClick={() => handleMenuItemClick("password")}
              className={
                expandMenuItem === "password"
                  ? style.sidebarMenuActive
                  : style.sidebarMenu
              }
            >
              <div className={style.sidebarMenuItem}>
                <TbPasswordUser className={style.sidebarMenuIcon} />
                <span>Change Password</span>
              </div>
            </div>
          </Link>
          <Link className={style.SidebarLink} to="/delete">
            <div
              onClick={() => handleMenuItemClick("delete")}
              className={
                expandMenuItem === "delete"
                  ? style.sidebarMenuActive
                  : style.sidebarMenu
              }
            >
              <div className={style.sidebarMenuItem}>
                <AiOutlineUserDelete className={style.sidebarMenuIcon} />
                <span>Delete Account</span>
              </div>
            </div>
          </Link>
          <Link className={style.SidebarLink} to="/orders">
            <div
              onClick={() => handleMenuItemClick("orders")}
              className={
                expandMenuItem === "orders"
                  ? style.sidebarMenuActive
                  : style.sidebarMenu
              }
            >
              <div className={style.sidebarMenuItem}>
                <MdHistory className={style.sidebarMenuIcon} />
                <span>Order History</span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    );
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
        <Link className={style.SidebarLink} to="/admin/">
          <div
            onClick={() => handleMenuItemClick("admin")}
            className={
              expandMenuItem === "admin"
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
        <Link className={style.SidebarLink} to="/">
          <div
            onClick={() => handleMenuItemClick("homepage")}
            className={style.sidebarMenu}
          >
            <div className={style.sidebarMenuItem}>
              <IoHomeOutline className={style.sidebarMenuIcon} />
              <span>Homepage</span>
            </div>
          </div>
        </Link>

        <div className={style.sidebarMenuLabel}>All Pages</div>
        <div
          onClick={() => handleMenuItemClick("products")}
          className={
            expandMenuItem === "products"
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
        {expandMenuItem === "products" && (
          <div className={style.sidebarSubMenu}>
            <ul>
              <Link
                className={
                  url.pathname.includes("/products/add/")
                    ? style.SidebarLinkActive
                    : style.SidebarLink
                }
                onClick={() => handleSubMenuItemClick("addproducts")}
                to="/products/add/"
              >
                <li className={style.sidebarSubMenuList}>Add New Product</li>
              </Link>
              <Link
                className={
                  url.pathname.includes("/products/all/")
                    ? style.SidebarLinkActive
                    : style.SidebarLink
                }
                onClick={() => handleSubMenuItemClick("allproducts")}
                to="/products/all/"
              >
                <li className={style.sidebarSubMenuList}>All Products</li>
              </Link>
            </ul>
          </div>
        )}

        <div
          onClick={() => handleMenuItemClick("category")}
          className={
            expandMenuItem === "category"
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
        {expandMenuItem === "category" && (
          <div className={style.sidebarSubMenu}>
            <ul>
              <Link
                onClick={() => handleSubMenuItemClick("addcategory")}
                className={
                  url.pathname.includes("/category/add/")
                    ? style.SidebarLinkActive
                    : style.SidebarLink
                }
                to="/category/add/"
              >
                <li className={style.sidebarSubMenuList}>Add New Category</li>
              </Link>
              <Link
                onClick={() => handleSubMenuItemClick("allcategory")}
                className={
                  url.pathname.includes("/category/all/")
                    ? style.SidebarLinkActive
                    : style.SidebarLink
                }
                to="/category/all/"
              >
                <li className={style.sidebarSubMenuList}>All Categories</li>
              </Link>
            </ul>
          </div>
        )}
        <div
          onClick={() => handleMenuItemClick("attributes")}
          className={
            expandMenuItem === "attributes"
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
        {expandMenuItem === "attributes" && (
          <div className={style.sidebarSubMenu}>
            <ul>
              <Link
                onClick={() => handleSubMenuItemClick("addattributes")}
                className={
                  url.pathname.includes("/attributes/add/")
                    ? style.SidebarLinkActive
                    : style.SidebarLink
                }
                to="/attributes/add/"
              >
                <li className={style.sidebarSubMenuList}>Add Attributes</li>
              </Link>
              <Link
                onClick={() => handleSubMenuItemClick("allattributes")}
                className={
                  url.pathname.includes("/attributes/all/")
                    ? style.SidebarLinkActive
                    : style.SidebarLink
                }
                to="/attributes/all/"
              >
                <li className={style.sidebarSubMenuList}>All Attributes</li>
              </Link>
            </ul>
          </div>
        )}
        <div
          onClick={() => handleMenuItemClick("orders")}
          className={
            expandMenuItem === "orders"
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
        {expandMenuItem === "orders" && (
          <div className={style.sidebarSubMenu}>
            <ul>
              <Link
                onClick={() => handleSubMenuItemClick("allorders")}
                className={
                  url.pathname.includes("/orders/all/")
                    ? style.SidebarLinkActive
                    : style.SidebarLink
                }
                to="/orders/all/"
              >
                <li className={style.sidebarSubMenuList}>All Orders</li>
              </Link>
              <Link
                onClick={() => handleSubMenuItemClick("trackorder")}
                className={
                  url.pathname.includes("/orders/track/")
                    ? style.SidebarLinkActive
                    : style.SidebarLink
                }
                to="/orders/track/"
              >
                <li className={style.sidebarSubMenuList}>Track Order</li>
              </Link>
            </ul>
          </div>
        )}
        <div
          onClick={() => handleMenuItemClick("users")}
          className={
            expandMenuItem === "users"
              ? style.sidebarMenuActive
              : style.sidebarMenu
          }
        >
          <div className={style.sidebarMenuItem}>
            <FaRegUser className={style.sidebarMenuIcon} />
            <span>Users</span>
          </div>
          <IoIosArrowDown className={style.arrowIcon} />
        </div>
        {expandMenuItem === "users" && (
          <div className={style.sidebarSubMenu}>
            <ul>
              <Link
                onClick={() => handleSubMenuItemClick("allusers")}
                className={
                  url.pathname.includes("/users/all/")
                    ? style.SidebarLinkActive
                    : style.SidebarLink
                }
                to="/users/all/"
              >
                <li className={style.sidebarSubMenuList}>All Users</li>
              </Link>
              <Link
                onClick={() => handleSubMenuItemClick("adduser")}
                className={
                  url.pathname.includes("/users/add/")
                    ? style.SidebarLinkActive
                    : style.SidebarLink
                }
                to="/users/add/"
              >
                <li className={style.sidebarSubMenuList}>Add User</li>
              </Link>
            </ul>
          </div>
        )}
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
