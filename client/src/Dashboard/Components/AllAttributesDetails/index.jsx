import React, { useEffect, useRef, useState } from "react";
import style from "./AllAttributesDetails.module.scss";
import { useSidebarToggler } from "../../ContextHooks/sidebarToggler";
import { GoNote } from "react-icons/go";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Row, Col, Tooltip } from "antd";
import Highlighter from "react-highlight-words";
import { AiOutlineDelete } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { TfiPlus } from "react-icons/tfi";
import { Navigate, useNavigate } from "react-router-dom";
import Pagination from "../Pagination";
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

export default function AllAttributesDetails() {
  const { sidebarVisible } = useSidebarToggler();
  const navigation = useNavigate();
  const columns = [
    {
      title: "ID",
      dataIndex: "ID",
      key: "ID",
      width: "8%",
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
      render: (text) => (
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
      width: "8%",
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
          ? `${style.AllAttributesDetails} ${style.AllAttributesDetailsFull} `
          : style.AllAttributesDetails
      }
    >
      <div className={style.pageHeader}>
        <p className={style.cardTitle}>All Attributes</p>
        <Pagination />
      </div>
      <div className={style.cardBG}>
        <div className={style.alaContainer}>
          <GoNote className={style.alaNoteICON} />
          <p className={style.alaNote}>
            Tip search by specific ID: Each product is provided with a unique
            ID, which you can rely on to find the exact product you need.
          </p>
        </div>
      </div>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12} lg={12}>
          <div className={style.cardBG}>
            <p className={style.alaTitle}>All Colors</p>
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
                  localStorage.setItem("expandSubMenuItem", "AddAttributes");
                  navigation("/AddAttributes");
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
        </Col>
        <Col xs={24} md={12} lg={12}>
          <div className={style.cardBG}>
            <p className={style.alaTitle}>All Sizes</p>
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
                  localStorage.setItem("expandSubMenuItem", "AddAttributes");
                  navigation("/AddAttributes");
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
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12} lg={12}>
          <div className={style.cardBG}>
            <p className={style.alaTitle}>All Brands</p>
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
                  localStorage.setItem("expandSubMenuItem", "AddAttributes");
                  navigation("/AddAttributes");
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
        </Col>
      </Row>
    </div>
  );
}
