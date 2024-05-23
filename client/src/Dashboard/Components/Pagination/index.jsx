import React, { useEffect } from "react";
import style from "./Pagination.module.scss";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";

export default function Pagination() {
  const parentMenu = localStorage.getItem("expandMenuItem");
  const subMenu = localStorage.getItem("expandSubMenuItem");

  return (
    <Breadcrumb
      items={[
        {
          title: "Home",
        },
        {
          title: <Link href={`/${subMenu}`}>{parentMenu}</Link>,
        },
        {
          title: <a>{subMenu}</a>,
        },
      ]}
    />
  );
}
