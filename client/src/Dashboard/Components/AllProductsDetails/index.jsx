import React, { useRef, useState } from "react";
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
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const navigation = useNavigate();
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>

          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Product",
      dataIndex: "title",
      key: "title",
      width: "50%",
      ...getColumnSearchProps("title"),
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
          {text}
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
            Add New Product
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 3 }}
        />
      </div>
    </div>
  );
}
