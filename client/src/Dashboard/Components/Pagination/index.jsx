import React, { useEffect } from "react";
import style from "./Pagination.module.scss";
import { Breadcrumb } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Pagination() {
  const url = useLocation();
  const urlParent = url.pathname.split("/").filter(Boolean)[0];
  const urlSub = url.pathname.split("/").filter(Boolean)[1];
  const navigate = useNavigate();
  return (
    <Breadcrumb
      items={[
        {
          title: <Link to={"/"}>Home</Link>,
        },
        {
          title: <p style={{ textTransform: "capitalize" }}>{urlParent} </p>,
        },
        {
          title: (
            <Link
              to={`/${urlParent}/${urlSub}`}
              style={{ textTransform: "capitalize" }}
            >
              {urlSub}
            </Link>
          ),
        },
      ]}
    />
  );
}
