import React, { useEffect, useRef, useState } from "react";
import style from "./AllCategoryDetails.module.scss";
import { useSidebarToggler } from "../../ContextHooks/sidebarToggler";
import { GoNote } from "react-icons/go";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Tooltip } from "antd";
import Highlighter from "react-highlight-words";
import { AiOutlineDelete } from "react-icons/ai";
import Pagination from "../Pagination";
import { TfiPlus } from "react-icons/tfi";
import { CiSearch } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";

const data = [
  {
    key: "1",
    title: "John Brown",
    ID: 32,
  },
  {
    key: "2",
    title: "Lorem Ipsum",
    ID: 32,
    Price: 3200,
  },
  {
    key: "3",
    title: "Whie Nuwnw",
    ID: 32,
  },
  {
    key: "4",
    title: "Kikur Idjs",
    ID: 32,
  },
];

export default function AllCategoryDetails() {
  const { sidebarVisible } = useSidebarToggler();
  const navigation = useNavigate();

  const columns = [
    {
      title: "ID",
      dataIndex: "ID",
      key: "ID",
      width: "5%",
      sorter: (a, b) => a.ID - b.ID,
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
      title: "Action",
      key: "action",
      width: "5%",
      render: () => (
        <Space size="middle">
          <Tooltip title="Delete" color={"red"}>
            <AiOutlineDelete className={style.alaICON} />
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
          ? `${style.AllCategoryDetails} ${style.AllCategoryDetailsFull}`
          : style.AllCategoryDetails
      }
    >
      <div className={style.pageHeader}>
        <p className={style.cardTitle}>All Categories</p>
        <Pagination />
      </div>
      <div className={style.cardBG}>
        <div className={style.acContainer}>
          <GoNote className={style.acICON} />
          <p className={style.acNote}>
            Tip search by Category ID: Each category is provided with a unique
            ID, which you can rely on to find the exact category you need.
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
              localStorage.setItem("expandSubMenuItem", "AddCategory");
              navigation("/AddCategory");
            }}
            className={style.apButton}
          >
            <TfiPlus className={style.apICON} />
            Add New
          </Button>
        </div>
        <Table
          className="customTable"
          columns={columns}
          dataSource={filteredData}
          pagination={{ pageSize: 3 }}
        />
      </div>
    </div>
  );
}
