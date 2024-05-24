import React, { useEffect, useRef, useState } from "react";
import style from "./UsersDetails.module.scss";
import { useSidebarToggler } from "../../ContextHooks/sidebarToggler";
import { GoNote } from "react-icons/go";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Row, Col, Tooltip } from "antd";
import Highlighter from "react-highlight-words";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import Pagination from "../Pagination";
import { TfiPlus } from "react-icons/tfi";
import { CiSearch } from "react-icons/ci";

const data = [
  {
    key: "1",
    image: "https://remosnextjs.vercel.app/images/avatar/user-9.png",
    title: "John Brown",
    ID: 32,
  },
  {
    key: "2",
    image: "https://remosnextjs.vercel.app/images/avatar/user-9.png",
    title: "Lorem Ipsum",
    ID: 32,
  },
  {
    key: "3",
    image: "https://remosnextjs.vercel.app/images/avatar/user-9.png",
    title: "Whie Nuwnw",
    ID: 32,
  },
  {
    key: "4",
    image: "https://remosnextjs.vercel.app/images/avatar/user-9.png",
    title: "Kikur Idjs",
    ID: 32,
  },
];

export default function UsersDetails() {
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
          style={{
            display: "flex",
            alignItems: "center",
            fontWeight: "bold",
          }}
        >
          <img
            src={record.image}
            alt="product"
            style={{
              width: 40,
              height: 40,
              marginRight: 10,
              borderRadius: "50%",
            }}
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
      title: "Action",
      key: "action",
      width: "5%",
      render: () => (
        <Space size="middle">
          <Tooltip title="Edit User Account" color={"blue"}>
            <FaRegEdit className={style.udICONEdit} />
          </Tooltip>
          <Tooltip title="Delete User Account" color={"red"}>
            <AiOutlineDelete className={style.udICON} />
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
          ? `${style.UsersDetails} ${style.UsersDetailsFull} `
          : style.UsersDetails
      }
    >
      <div className={style.pageHeader}>
        <p className={style.cardTitle}>All Users</p>
        <Pagination />
      </div>
      <div className={style.cardBG}>
        <div className={style.udContainer}>
          <GoNote className={style.udNoteICON} />
          <p className={style.udNote}>
            Tip search by User ID: Each user is provided with a unique ID, which
            you can rely on to find the exact product you need.
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
