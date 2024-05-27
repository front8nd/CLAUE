import React from "react";
import { Table } from "antd";
import style from "./TopCountryBySale.module.scss";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaArrowTrendDown } from "react-icons/fa6";

const columns = [
  {
    title: "Country",
    dataIndex: "country",
    key: "country",
    width: "50%",
    render: (text, image) => {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontWeight: "bold",
            marginLeft: "10px",
            padding: "10px 0",
          }}
        >
          <img
            src={image.image}
            alt="product"
            style={{
              width: 24,
              height: 24,
              marginRight: "10px",
              flexShrink: 0,
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              textWrap: "nowrap",
            }}
          >
            {text}
          </div>
        </div>
      );
    },
  },
  {
    title: "Trend",
    dataIndex: "trend",
    key: "trend",
    width: "20%",
    render: (record) => (
      <div style={{ fontSize: "20px" }}>
        {record === "profit" ? (
          <i style={{ color: "#22c55e" }}>
            <FaArrowTrendUp />
          </i>
        ) : (
          <i style={{ color: "#ff5200" }}>
            <FaArrowTrendDown />
          </i>
        )}
      </div>
    ),
  },
  {
    title: "Sales",
    dataIndex: "sales",
    key: "sales",
    width: "20%",
    render: (text) => <span style={{ marginLeft: "50px" }}>{text}</span>,
  },
];
const data = [
  {
    key: "1",
    image: "https://remosnextjs.vercel.app/images/country/1.png",
    country: "United Kingdom",
    sales: 6972,
    trend: "profit",
  },
  {
    key: "2",
    image: "https://remosnextjs.vercel.app/images/country/2.png",
    country: "Spain",
    sales: 6972,
    trend: "profit",
  },
  {
    key: "3",
    image: "https://remosnextjs.vercel.app/images/country/3.png",
    country: "India",
    sales: 6972,
    trend: "loss",
  },
  {
    key: "4",
    image: "https://remosnextjs.vercel.app/images/country/4.png",
    country: "Brazil",
    sales: 6972,
    trend: "profit",
  },
  {
    key: "5",
    image: "https://remosnextjs.vercel.app/images/country/5.png",
    country: "France",
    sales: 6972,
    trend: "loss",
  },
];
const TopCountryBySale = () => (
  <div>
    <h5 className={style.cardTitle}>Top Countries by Sales</h5>
    <div className={style.cardSubHeading}>
      <h4 className={style.cardSubHeadingH4}>$37,802</h4>
      <i className={style.cardSubHeadingTrendingICon}>
        <FaArrowTrendUp />
      </i>
      <div className={style.cardSubHeadingTText}>1.56%</div>
      <div className={style.cardSubHeadingTSub}>since last weekend</div>
    </div>
    <Table
      columns={columns}
      dataSource={data}
      className="customTable_Card"
      virtual
    />
  </div>
);
export default TopCountryBySale;
