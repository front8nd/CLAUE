import React from "react";
import UserAccount from "../../Components/UserAccount";
import SearchBar from "../../Components/SearchBar";
import style from "./Navbar.module.scss";
import { RiMenuUnfoldFill } from "react-icons/ri";
import { useSidebarToggler } from "../../ContextHooks/sidebarToggler";

export default function Navbar() {
  const { sidebarVisible, toggleSidebar } = useSidebarToggler();
  console.log(sidebarVisible);
  return (
    <div
      className={
        sidebarVisible !== true
          ? `${style.Navbar} ${style.NavbarFull} `
          : style.Navbar
      }
    >
      <div className={style.leftHeader}>
        {sidebarVisible !== true ? (
          <RiMenuUnfoldFill
            onClick={() => {
              toggleSidebar();
            }}
            className={style.sidebarOpenIcon}
          />
        ) : (
          ""
        )}
        <SearchBar />
      </div>
      <div className={style.rightHeader}>
        <UserAccount />
      </div>
    </div>
  );
}
