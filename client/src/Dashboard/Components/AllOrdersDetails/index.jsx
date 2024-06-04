import React, { useEffect, useRef, useState } from "react";
import style from "./AllOrdersDetails.module.scss";
import { useSidebarToggler } from "../../ContextHooks/sidebarToggler";
import { GoNote } from "react-icons/go";
import { Tag, Table, Tooltip } from "antd";
import Highlighter from "react-highlight-words";
import Pagination from "../Pagination";
import { CiSearch } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function AllOrdersDetails() {
  const { sidebarVisible } = useSidebarToggler();
  const [loading, setLoading] = useState(null);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text, record) => {
        return (
          <Highlighter
            highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text}
            className={style.truncate}
          />
        );
      },
    },
    {
      title: "Name",
      dataIndex: "billing_details",
      key: "id",
      render: (text, record) => <p className={style.truncate}>{text.name}</p>,
    },
    {
      title: "Email",
      dataIndex: "billing_details",
      key: "id",
      render: (text, record) => <p className={style.truncate}>{text.email}</p>,
    },
    {
      title: "Address",
      dataIndex: "billing_details",
      key: "id",
      render: (text, record) => (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "max-content",
          }}
        >
          <ul className={style.truncate}>
            <li>{text.address.line1}</li>
            <li>{text.address.city}</li>
            <li>{text.address.country}</li>
          </ul>
        </div>
      ),
    },
    {
      title: "Price",
      dataIndex: "amount",
      key: "id",
      render: (text, record) => {
        return <p className={style.truncate}>{Math.round(text / 80)}</p>;
      },
    },
    {
      title: "Payment Method",
      dataIndex: "payment_method_details",
      key: "id",
      render: (text) => <p className={style.truncate}>{text.type}</p>,
    },
    {
      title: "Order Status",
      dataIndex: "status",
      key: "id",
      render: (text) => {
        let color = "blue";
        if (text === "succeeded") color = "green";
        else if (text === "failed") color = "pink";
        return (
          <Tag color={color} key={text}>
            {text.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Receipt",
      dataIndex: "receipt_url",
      key: "id",
      render: (text) => {
        return (
          <Tooltip title="Full Receipit" color={"blue"}>
            <Link to={`${text}`} target="_blank">
              <FaEye className={style.apICONView} />
            </Link>
          </Tooltip>
        );
      },
    },
  ];

  // Stripe Data

  const [stripeData, setStripeData] = useState([]);
  console.log(stripeData);
  const fetchStripeData = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5174/api/stripeData");
      const balanceTransactions = await response.json();
      setStripeData(balanceTransactions);
    } catch (error) {
      console.error("Error fetching Stripe data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStripeData();
  }, []);

  // Custom Search Bar
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState(null);

  useEffect(() => {
    if (stripeData.length !== 0) {
      setFilteredData(
        stripeData.data.filter((item) =>
          item.id.toLowerCase().includes(searchText.toLowerCase())
        )
      );
    } else {
      setFilteredData([]);
    }
  }, [stripeData, searchText]);

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
          loading={loading}
          columns={columns}
          dataSource={filteredData}
          className="customTable"
          pagination={{ pageSize: 10 }}
          virtual
          scroll={{ x: "max-content" }}
        />
      </div>
    </div>
  );
}
