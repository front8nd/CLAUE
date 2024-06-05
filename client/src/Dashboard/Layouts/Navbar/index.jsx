import React, { useEffect, useState } from "react";
import UserAccount from "../../Components/UserAccount";
import SearchBar from "../../Components/SearchBar";
import style from "./Navbar.module.scss";
import { RiMenuUnfoldFill } from "react-icons/ri";
import { useSidebarToggler } from "../../ContextHooks/sidebarToggler";
import { CiDark } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { LuMessageSquare } from "react-icons/lu";
import { RxDashboard } from "react-icons/rx";
import { CiSettings } from "react-icons/ci";
import { Badge } from "antd";

export default function Navbar() {
  const { sidebarVisible, toggleSidebar } = useSidebarToggler();

  return (
    <div className={sidebarVisible === false ? style.NavbarFull : style.Navbar}>
      <div className={style.leftHeader}>
        {!sidebarVisible && (
          <>
            <span className={style.leftHeaderLOGO}></span>
            <RiMenuUnfoldFill
              onClick={() => {
                toggleSidebar();
              }}
              className={style.sidebarOpenIcon}
            />
          </>
        )}
        <div className={style.searchBar}>
          <SearchBar />
        </div>
      </div>
      <div className={style.rightHeader}>
        <div className={style.navbarIconGroup}>
          <div className={style.navbarIcon}>
            <CiDark />
          </div>
          <Badge count={9} className={style.navbarIcon}>
            <IoIosNotificationsOutline />
          </Badge>
          <Badge count={6} color="#2275fc" className={style.navbarIcon}>
            <LuMessageSquare />
          </Badge>
          <Badge count={3} color="#22c55e" className={style.navbarIcon}>
            <RxDashboard />
          </Badge>
          <div className={style.navbarIcon}>
            <CiSettings />
          </div>
        </div>
        <div className={style.navbarAccount}>
          <UserAccount />
        </div>
      </div>
    </div>
  );
}
