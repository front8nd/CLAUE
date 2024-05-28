import React from "react";
import style from "./Footer.module.scss";
import { useSidebarToggler } from "../../ContextHooks/sidebarToggler";
import { FaHeart } from "react-icons/fa";

export default function Footer() {
  const { sidebarVisible } = useSidebarToggler();

  return (
    <div className={sidebarVisible === false ? style.FooterFull : style.Footer}>
      <p>
        Copyright © 2024 Remos. Design with{" "}
        <i style={{ verticalAlign: "middle", color: "red", gap: "5px" }}>
          <FaHeart />
        </i>{" "}
        by{" "}
        <a href="#" style={{ textDecoration: "none", color: "#007aff" }}>
          Themesflat
        </a>
        . All rights reserved.
      </p>
    </div>
  );
}
