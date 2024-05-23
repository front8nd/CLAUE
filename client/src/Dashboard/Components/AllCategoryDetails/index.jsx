import React, { useRef, useState } from "react";
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
      title: "ID",
      dataIndex: "ID",
      key: "ID",
      width: "5%",
      ...getColumnSearchProps("ID"),
      sorter: (a, b) => a.ID - b.ID,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "50%",
      ...getColumnSearchProps("title"),
      sorter: (a, b) => a.title.localeCompare(b.title),
      sortDirections: ["descend", "ascend"],
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
            Add New Category
          </Button>
        </div>
        <Table
          className={style.tableContainer}
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 3 }}
        />
      </div>
    </div>
  );
}
