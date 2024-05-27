import React from "react";
import style from "./Footer.module.scss";
import { useSidebarToggler } from "../../ContextHooks/sidebarToggler";
export default function Footer() {
  const { sidebarVisible } = useSidebarToggler();

  return (
    <div className={sidebarVisible === false ? style.Footer : style.FooterFull}>
      Copyright © 2024 Remos. Design with by Themesflat. All rights reserved.
    </div>
  );
}
