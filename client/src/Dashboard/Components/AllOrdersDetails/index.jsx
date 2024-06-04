import React, { useEffect, useRef, useState } from "react";
import style from "./AllOrdersDetails.module.scss";
import { useSidebarToggler } from "../../ContextHooks/sidebarToggler";
import { GoNote } from "react-icons/go";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Row, Col, Tooltip } from "antd";
import Highlighter from "react-highlight-words";
import Pagination from "../Pagination";
import { CiSearch } from "react-icons/ci";
import Loading from "../../../components/Loading";

export default function AllOrdersDetails() {
  const { sidebarVisible } = useSidebarToggler();
  const [loading, setLoading] = useState(null);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text, record) => {
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.id.toString() : ""}
        />;
      },
    },
    {
      title: "Name",
      dataIndex: "billing_details",
      key: "id",
      render: (text, record) => <div>{text.name}</div>,
    },
    {
      title: "Email",
      dataIndex: "billing_details",
      key: "id",
      render: (text, record) => (
        <div>
          <p>{text.email}</p>
        </div>
      ),
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
          }}
        >
          <ul style={{ listStyle: "none" }}>
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
        return <p>{Math.round(text / 80)}</p>;
      },
    },
    {
      title: "Payment Method",
      dataIndex: "payment_method_details",
      key: "id",
      render: (text) => (
        <p style={{ textTransform: "capitalize" }}>{text.type}</p>
      ),
    },
    {
      title: "Order Status",
      dataIndex: "status",
      key: "id",
      render: (text) => <p style={{ textTransform: "capitalize" }}>{text}</p>,
    },
  ];
  // Stripe Data

  const [stripeData, setStripeData] = useState([]);
  const fetchStripeData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://arrowtheme-project.vercel.app/api/stripe-data"
      );
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
  console.log(stripeData);

  // Custom Search Bar
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState(stripeData.data);

  useEffect(() => {
    setFilteredData(
      stripeData.data.filter((item) =>
        item.id.toLowerCase().includes(searchText.toLowerCase())
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
      {loading === true ? (
        <div>
          <div className={style.loading}>
            <Loading />
          </div>
        </div>
      ) : (
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
            columns={columns}
            dataSource={filteredData}
            className="customTable"
            pagination={{ pageSize: 10 }}
            virtual
          />
        </div>
      )}
    </div>
  );
}
