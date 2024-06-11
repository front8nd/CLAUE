import React, { useEffect, useState } from "react";
import style from "./OrderHistory.module.scss";
import { GoNote } from "react-icons/go";
import { Tag, Table, message } from "antd";
import Highlighter from "react-highlight-words";
import { CiSearch } from "react-icons/ci";
import { useSelector } from "react-redux";
import axios from "axios";
import { useSidebarToggler } from "../../ContextHooks/sidebarToggler";
import Pagination from "../Pagination";

const columns = (searchText, style) => [
  {
    title: "Order Placed",
    dataIndex: "created",
    key: "id",
    sorter: (a, b) => a.created - b.created,
    render: (text) => {
      const orderDate = new Date(text * 1000);
      const formattedDate = orderDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      return <div className={style.truncate}>{formattedDate}</div>;
    },
  },
  {
    title: "Name",
    dataIndex: "customer_details",
    key: "id",
    render: (text) => (
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
    render: (text) => (
      <p className={style.truncate}>
        {text !== null ? text.email : "Not Found"}
      </p>
    ),
  },
  {
    title: "Address",
    dataIndex: "customer_details",
    key: "id",
    render: (text) => (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "max-content",
        }}
      >
        <ul className={style.truncate}>
          <li>
            <span className={style.aoTitle}>Street:</span>
            {text !== null ? text.address.line1 : "Not Found"}
          </li>
          <li>
            <span className={style.aoTitle}>City:</span>
            {text !== null ? text.address.city : "Not Found"}
          </li>
          <li>
            <span className={style.aoTitle}>Country:</span>
            {text !== null ? text.address.country : "Not Found"}
          </li>
        </ul>
      </div>
    ),
  },
  {
    title: "Product",
    dataIndex: "lineItems",
    key: "id",
    render: (text) => (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "max-content",
        }}
      >
        <ul className={style.truncate}>
          <li>
            <span className={style.aoTitle}>Title:</span>
            {text !== null ? `${text[0].description} ` : "Not Found"}
          </li>
          <li>
            <span className={style.aoTitle}>Quantity:</span>
            {text !== null ? text[0].quantity : "Not Found"}
          </li>
          <li>
            <span className={style.aoTitle}>Per Unit Price:</span>
            {text !== null
              ? Math.round(text[0].amount_total / 80)
              : "Not Found"}
          </li>
        </ul>
      </div>
    ),
  },
  Table.EXPAND_COLUMN,
  {
    title: "SubTotal",
    dataIndex: "amount_subtotal",
    key: "id",
    render: (text) => {
      return <p className={style.truncate}>{Math.round(text / 80)}</p>;
    },
  },
  {
    title: "Shipping Cost",
    dataIndex: "shipping_cost",
    key: "id",
    render: (text) => {
      return (
        <p className={style.truncate}>{Math.round(text.amount_total / 80)}</p>
      );
    },
  },
  {
    title: "Discount",
    dataIndex: "total_details",
    key: "id",
    render: (text) => {
      return (
        <p className={style.truncate}>
          {Math.round(text.amount_discount / 80)}
        </p>
      );
    },
  },
  {
    title: "Tax",
    dataIndex: "total_details",
    key: "id",
    render: (text) => {
      return (
        <p className={style.truncate}>{Math.round(text.amount_tax / 80)}</p>
      );
    },
  },
  {
    title: "Total",
    dataIndex: "amount_total",
    key: "id",
    render: (text) => {
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
    dataIndex: "payment_information",
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
];

const NestedColumns = [
  {
    title: "Title",
    dataIndex: "description",
    key: "description",
    render: (text) => {
      return <p>{text}</p>;
    },
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
    render: (text) => {
      return <p>{text}</p>;
    },
  },
  {
    title: "Unit Price",
    dataIndex: "amount_total",
    key: "amount_total",
    render: (text) => {
      return <p>{Math.round(text / 80)}</p>;
    },
  },
];

export default function UserOrderHistory() {
  const { sidebarVisible } = useSidebarToggler();
  const [loading, setLoading] = useState(false);
  const userDetails = useSelector((state) => state.User.userDetail);
  const [searchText, setSearchText] = useState("");
  const [stripeData, setStripeData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const url = import.meta.env.VITE_BASE_SERVER_URL;

  const fetchStripeData = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${url}/api/stripe/customerOrders`, {
        email: userDetails.email,
      });
      setStripeData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching Stripe data:", error);
      message.error("Failed to fetch order data. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (stripeData.length !== 0) {
      setFilteredData(
        stripeData.filter((item) =>
          item.customer_details !== null
            ? item.customer_details.name
                .toLowerCase()
                .includes(searchText.toLowerCase())
            : false
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

  useEffect(() => {
    fetchStripeData();
  }, [userDetails]);

  return (
    <div
      className={
        sidebarVisible === false
          ? `${style.OrderHistory} ${style.OrderHistoryFull} `
          : style.OrderHistory
      }
    >
      <div className={style.pageHeader}>
        <p className={style.cardTitle}>Order History</p>
        <Pagination />
      </div>
      <div className={style.cardBG}>
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
          columns={columns(searchText, style)}
          dataSource={filteredData}
          className="customTable"
          pagination={{ pageSize: 10 }}
          virtual
          scroll={{ x: "max-content" }}
          rowKey={(record) => record.id}
          expandable={{
            expandedRowRender: (record) => (
              <Table
                className="customTable expandTable"
                columns={NestedColumns}
                dataSource={record.lineItems}
                pagination={false}
                rowKey={(lineItem) => lineItem.id}
              />
            ),
            rowExpandable: (record) =>
              record.lineItems && record.lineItems.length > 0,
          }}
          summary={(pageData) => {
            let totalRevenue = calculateTotalRevenue(pageData);
            return (
              <Table.Summary.Row
                style={{
                  background: "#f8f9fc",
                  fontWeight: "bold",
                }}
              >
                <Table.Summary.Cell index={0} colSpan={10}>
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
