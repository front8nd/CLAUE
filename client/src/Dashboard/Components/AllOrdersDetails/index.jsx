import React, { useEffect, useState } from "react";
import style from "./AllOrdersDetails.module.scss";
import { useSidebarToggler } from "../../ContextHooks/sidebarToggler";
import { GoNote } from "react-icons/go";
import { Tag, Table, message } from "antd";
import Highlighter from "react-highlight-words";
import Pagination from "../Pagination";
import { CiSearch } from "react-icons/ci";

export default function AllOrdersDetails() {
  const { sidebarVisible } = useSidebarToggler();
  const [loading, setLoading] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [stripeData, setStripeData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const columns = [
    {
      title: "Order Placed",
      dataIndex: "created",
      key: "id",
      sorter: (a, b) => a.created - b.created,
      render: (text, record) => {
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
      render: (text, record) => (
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
              {text !== null ? Math.round(text[0].amount_total) : "Not Found"}
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
      render: (text, record) => {
        return <p className={style.truncate}>{Math.round(text)}</p>;
      },
    },
    {
      title: "Shipping Cost",
      dataIndex: "shipping_cost",
      key: "id",
      render: (text, record) => {
        return (
          <p className={style.truncate}>{Math.round(text.amount_total)}</p>
        );
      },
    },
    {
      title: "Discount",
      dataIndex: "total_details",
      key: "id",
      render: (text, record) => {
        return (
          <p className={style.truncate}>{Math.round(text.amount_discount)}</p>
        );
      },
    },
    {
      title: "Tax",
      dataIndex: "total_details",
      key: "id",
      render: (text, record) => {
        return <p className={style.truncate}>{Math.round(text.amount_tax)}</p>;
      },
    },
    {
      title: "Total",
      dataIndex: "amount_total",
      key: "id",
      render: (text, record) => {
        return <p className={style.truncate}>{Math.round(text)}</p>;
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
        return <p>{Math.round(text)}</p>;
      },
    },
  ];

  const fetchStripeData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:5174/api/stripe/stripeData"
      );
      const results = await response.json();
      setStripeData(results);
      localStorage.setItem("SalesCard", JSON.stringify(results));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching Stripe data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStripeData();
  }, []);
  console.log(stripeData);
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
      (acc, record) => acc + Math.round(record.amount_total),
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
        <p className={style.cardTitle}>All Orders</p>
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
