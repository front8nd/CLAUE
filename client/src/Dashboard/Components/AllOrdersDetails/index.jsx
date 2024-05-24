import React, { useEffect, useRef, useState } from "react";
import style from "./AllOrdersDetails.module.scss";
import { useSidebarToggler } from "../../ContextHooks/sidebarToggler";
import { GoNote } from "react-icons/go";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Row, Col, Tooltip } from "antd";
import Highlighter from "react-highlight-words";
import Pagination from "../Pagination";
import { TfiPlus } from "react-icons/tfi";
import { CiSearch } from "react-icons/ci";

const data = [
  {
    key: "1",
    image: "https://remosnextjs.vercel.app/images/products/1.png",
    title: "John Brown",
    ID: 32,
    Price: 3200,
    Status: "Complete",
  },
  {
    key: "2",
    image: "https://remosnextjs.vercel.app/images/products/1.png",
    title: "Lorem Ipsum",
    ID: 32,
    Price: 3200,
    Status: "Pending",
  },
  {
    key: "3",
    image: "https://remosnextjs.vercel.app/images/products/1.png",
    title: "Whie Nuwnw",
    ID: 32,
    Status: "Pending",
  },
  {
    key: "4",
    image: "https://remosnextjs.vercel.app/images/products/1.png",
    title: "Kikur Idjs",
    ID: 32,
    Status: "Pending",
  },
];

export default function AllOrdersDetails() {
  const { sidebarVisible } = useSidebarToggler();

  const columns = [
    {
      title: "ID",
      dataIndex: "ID",
      key: "ID",
      width: "5%",
      sorter: (a, b) => a.title.localeCompare(b.title),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "50%",
      sorter: (a, b) => a.title.localeCompare(b.title),
      sortDirections: ["descend", "ascend"],
      render: (text, record) => (
        <div
          style={{ display: "flex", alignItems: "center", fontWeight: "bold" }}
        >
          <img
            src={record.image}
            alt="product"
            style={{ width: 40, height: 40, marginRight: 10 }}
          />
          <Highlighter
            highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ""}
          />
        </div>
      ),
    },
    {
      title: "Price",
      dataIndex: "Price",
      key: "Price",
      width: "5%",
      sorter: (a, b) => a.title.localeCompare(b.title),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Order Status",
      dataIndex: "Status",
      key: "Status",
      width: "20%",
    },
  ];

  // Custom Search Bar
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    setFilteredData(
      data.filter((item) =>
        item.title.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [searchText]);
  return (
    <div
      className={
        sidebarVisible === false
          ? `${style.AllOrdersDetails} ${style.AllOrdersDetailsFull} `
          : style.AllOrdersDetails
      }
    >
      <div className={style.pageHeader}>
        <p className={style.cardTitle}>All Attributes</p>
        <Pagination />
      </div>
      <div className={style.cardBG}>
        <div className={style.aoContainer}>
          <GoNote className={style.aoICON} />
          <p className={style.aoNote}>
            Tip search by order ID: Each product is provided with a unique ID,
            which you can rely on to find the exact product you need.
          </p>
        </div>
        <div className={style.apContainer}>
          <div className={style.apInputBox}>
            <input
              placeholder="Search here..."
              className={style.apInput}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            ></input>
            <CiSearch className={style.apInputIcon} />
          </div>
        </div>
        <Table
          className={style.tableContainer}
          columns={columns}
          dataSource={filteredData}
          pagination={{ pageSize: 3 }}
        />
      </div>
    </div>
  );
}
