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
      title: "Name",
      dataIndex: "customer_details",
      key: "id",
      render: (text, record) => (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text !== null ? text.name : "Not Found"}
          className={style.truncate}
        />
      ),
    },
    {
      title: "Email",
      dataIndex: "customer_details",
      key: "id",
      render: (text, record) => (
        <p className={style.truncate}>
          {text !== null ? text.email : "Not Found"}
        </p>
      ),
    },
    {
      title: "Address",
      dataIndex: "customer_details",
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
            <li>{text !== null ? text.address.line1 : "Not Found"}</li>
            <li>{text !== null ? text.address.city : "Not Found"}</li>
            <li>{text !== null ? text.address.country : "Not Found"}</li>
          </ul>
        </div>
      ),
    },
    {
      title: "Product",
      dataIndex: "lineItems",
      key: "id",
      render: (text, record) => (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "max-content",
          }}
        >
          {text.map((e) => {
            return (
              <>
                <ul className={style.truncate}>
                  <li>Title: {e !== null ? e.description : "Not Found"}</li>
                  <li>Quanitity: {e !== null ? e.quantity : "Not Found"}</li>
                  <li>
                    Per Unit Price: {e !== null ? e.amount_total : "Not Found"}
                  </li>
                </ul>
              </>
            );
          })}
        </div>
      ),
    },
    {
      title: "SubTotal",
      dataIndex: "amount_subtotal",
      key: "id",
      render: (text, record) => {
        return <p className={style.truncate}>{Math.round(text / 80)}</p>;
      },
    },
    {
      title: "Shipping Cost",
      dataIndex: "shipping_cost",
      key: "id",
      render: (text, record) => {
        return (
          <p className={style.truncate}>{Math.round(text.amount_total / 80)}</p>
        );
      },
    },
    {
      title: "Total",
      dataIndex: "amount_total",
      key: "id",
      render: (text, record) => {
        return <p className={style.truncate}>{Math.round(text / 80)}</p>;
      },
    },
    {
      title: "Payment Method",
      dataIndex: "payment_method_types",
      key: "id",
      render: (text) => <p className={style.truncate}>{text[0]}</p>,
    },
    {
      title: "Order Status",
      dataIndex: "payment_informartion",
      key: "id",
      render: (text, record) => {
        let color = "blue";
        if (record.status === "complete") color = "green";
        else if (record.status === "expired") color = "pink";
        else if (record.payment_status === "paid") color = "yellow";
        else if (record.status === "unpaid") color = "brown";
        return (
          <div className={style.truncate}>
            <Tag color={color} key={record.status}>
              {record.status.toUpperCase()}
            </Tag>
            <Tag color={color} key={record.payment_status}>
              {record.payment_status.toUpperCase()}
            </Tag>
          </div>
        );
      },
    },
    {
      title: "View Receipt",
      dataIndex: "receipt_url",
      key: "id",
      render: (text) => {
        return (
          <Tooltip title="View Receipit" color={"blue"}>
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
      const response = await fetch("http://localhost:5174/stripeData");
      const results = await response.json();
      setStripeData(results);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching Stripe data:", error);
      setLoading(false);
    }
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
        stripeData.filter((item) =>
          item.customer_details !== null
            ? item.customer_details.name
                .toLowerCase()
                .includes(searchText.toLowerCase())
            : "Not Found"
        )
      );
    } else {
      setFilteredData([]);
    }
  }, [stripeData, searchText]);

  const calculateTotalRevenue = (data) => {
    return data.reduce(
      (acc, record) => acc + Math.round(record.amount_total / 80),
      0
    );
  };

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
          summary={(pageData) => {
            let totalRevenue = calculateTotalRevenue(pageData);
            return (
              <Table.Summary.Row
                style={{
                  background: "#f8f9fc",
                  fontWeight: "bold",
                }}
              >
                <Table.Summary.Cell index={0} colSpan={5}>
                  Total Sales
                </Table.Summary.Cell>
                <Table.Summary.Cell index={1}>
                  <p className={style.truncate}>{totalRevenue}</p>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={2} colSpan={3} />
              </Table.Summary.Row>
            );
          }}
        />
      </div>
    </div>
  );
}
