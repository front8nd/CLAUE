import React, { useEffect, useRef, useState } from "react";
import style from "./AllProductsDetails.module.scss";
import { useSidebarToggler } from "../../ContextHooks/sidebarToggler";
import { GoNote } from "react-icons/go";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Tooltip } from "antd";
import Highlighter from "react-highlight-words";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { TfiPlus } from "react-icons/tfi";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "../Pagination";
const data = [
  {
    key: "1",
    image: "https://remosnextjs.vercel.app/images/products/1.png",
    title: "John Brown",
    ID: 32,
    Price: 3200,
  },
  {
    key: "2",
    image: "https://remosnextjs.vercel.app/images/products/1.png",
    title: "Lorem Ipsum",
    ID: 32,
    Price: 3200,
  },
  {
    key: "3",
    image: "https://remosnextjs.vercel.app/images/products/1.png",
    title: "Whie Nuwnw",
    ID: 32,
    Price: 3200,
  },
  {
    key: "4",
    image: "https://remosnextjs.vercel.app/images/products/1.png",
    title: "Kikur Idjs",
    ID: 32,
    Price: 3200,
  },
];

export default function AllProductsDetails() {
  const { sidebarVisible } = useSidebarToggler();
  const navigation = useNavigate();

  const columns = [
    {
      title: "Product",
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
      title: "ID",
      dataIndex: "ID",
      key: "ID",
      width: "5%",
      sorter: (a, b) => a.title.localeCompare(b.title),
      sortDirections: ["descend", "ascend"],
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
      title: "Action",
      key: "action",
      width: "5%",
      render: () => (
        <Space size="middle">
          <Tooltip title="Edit" color={"blue"}>
            <FaRegEdit className={style.apICONEdit} />
          </Tooltip>
          <Tooltip title="Delete" color={"red"}>
            <AiOutlineDelete className={style.apICON} />
          </Tooltip>
        </Space>
      ),
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
          ? `${style.AllProductDetails} ${style.AllProductDetailsFull} `
          : style.AllProductDetails
      }
    >
      <div className={style.pageHeader}>
        <p className={style.cardTitle}>All Products</p>
        <Pagination />
      </div>
      <div className={style.cardBG}>
        <div className={style.apTextContainer}>
          <GoNote className={style.apNoteICON} />
          <p className={style.apNote}>
            Tip search by Product ID: Each product is provided with a unique ID,
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
          <Button
            onClick={() => {
              localStorage.setItem("expandSubMenuItem", "AddProducts");
              navigation("/AddProducts");
            }}
            className={style.apButton}
          >
            <TfiPlus className={style.apICON} />
            Add New
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={{ pageSize: 3 }}
        />
      </div>
    </div>
  );
}
