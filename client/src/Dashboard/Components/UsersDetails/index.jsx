import React, { useRef, useState } from "react";
import style from "./UsersDetails.module.scss";
import { useSidebarToggler } from "../../ContextHooks/sidebarToggler";
import { GoNote } from "react-icons/go";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Row, Col, Tooltip } from "antd";
import Highlighter from "react-highlight-words";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";

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
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

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
      width: "8%",
      ...getColumnSearchProps("title"),
      sorter: (a, b) => a.title.localeCompare(b.title),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      width: "8%",
      render: (text) => (
        <img
          src={text}
          alt="product"
          style={{ width: 50, height: 50, borderRadius: "50%  " }}
        />
      ),
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
      width: "8%",
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

  return (
    <div
      className={
        sidebarVisible === false
          ? `${style.UsersDetails} ${style.UsersDetailsFull} `
          : style.UsersDetails
      }
    >
      <p className={style.cardTitle}>All Users</p>
      <div className={style.cardBG}>
        <div className={style.udContainer}>
          <GoNote className={style.udNoteICON} />
          <p className={style.udNote}>
            Tip search by User ID: Each user is provided with a unique ID, which
            you can rely on to find the exact product you need.
          </p>
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
