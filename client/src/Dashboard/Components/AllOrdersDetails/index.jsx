import React, { useRef, useState } from "react";
import style from "./AllOrdersDetails.module.scss";
import { useSidebarToggler } from "../../ContextHooks/sidebarToggler";
import { GoNote } from "react-icons/go";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Row, Col, Tooltip } from "antd";
import Highlighter from "react-highlight-words";

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
        <img src={text} alt="product" style={{ width: 50, height: 50 }} />
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
      title: "Price",
      dataIndex: "Price",
      key: "Price",
      width: "8%",
      sorter: (a, b) => a.title.localeCompare(b.title),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Order Status",
      dataIndex: "Order Status",
      key: "Order Status",
      width: "16%",
    },
  ];

  return (
    <div
      className={
        sidebarVisible === false
          ? `${style.AllOrdersDetails} ${style.AllOrdersDetails} `
          : style.AllOrdersDetails
      }
    >
      <p className={style.cardTitle}>All Attributes</p>
      <div className={style.cardBG}>
        <div className={style.aoContainer}>
          <GoNote className={style.aoICON} />
          <p className={style.aoNote}>
            Tip search by order ID: Each product is provided with a unique ID,
            which you can rely on to find the exact product you need.
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
