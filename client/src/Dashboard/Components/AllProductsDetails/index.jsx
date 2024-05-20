import React, { useRef, useState } from "react";
import style from "./AllProductsDetails.module.scss";
import { useSidebarToggler } from "../../ContextHooks/sidebarToggler";
import { GoNote } from "react-icons/go";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import Highlighter from "react-highlight-words";
const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Joe Black",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Jim Green",
    age: 32,
    address: "Sydney No. 1 Lake Park",
  },
  {
    key: "4",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
];
export default function AllProductsDetails() {
  const { sidebarVisible } = useSidebarToggler();

  return (
    <div
      className={
        sidebarVisible === false
          ? `${style.AllProductDetails} ${style.AllProductDetailsFull} `
          : style.AllProductDetails
      }
    >
      <div className={style.cardBG}>
        <div className={style.apContainer}>
          <GoNote className={style.apICON} />
          <p className={style.apNote}>
            Tip search by Product ID: Each product is provided with a unique ID,
            which you can rely on to find the exact product you need.
          </p>
        </div>
      </div>
    </div>
  );
}
