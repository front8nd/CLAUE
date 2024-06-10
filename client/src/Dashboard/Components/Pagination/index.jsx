import React, { useEffect } from "react";
import style from "./Pagination.module.scss";
import { Breadcrumb } from "antd";
import { Link, useLocation } from "react-router-dom";

export default function Pagination() {
  const url = useLocation();
  const urlParent = url.pathname.split("/").filter(Boolean)[0];
  const urlSub = url.pathname.split("/").filter(Boolean)[1];
  return (
    <Breadcrumb
      items={[
        {
          title: "Home",
        },
        {
          title: <p style={{ textTransform: "capitalize" }}>{urlParent} </p>,
        },
        {
          title: <p style={{ textTransform: "capitalize" }}>{urlSub}</p>,
        },
      ]}
    />
  );
}
