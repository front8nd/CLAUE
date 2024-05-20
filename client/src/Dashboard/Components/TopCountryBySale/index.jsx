import React from "react";
import { Table } from "antd";
import style from "./TopCountryBySale.module.scss";
const columns = [
  {
    title: "Country Image",
    dataIndex: "image",
    key: "image",
    render: (text) => (
      <img src={text} alt="product" style={{ width: 50, height: 50 }} />
    ),
  },
  {
    title: "Country",
    dataIndex: "country",
    key: "country",
  },
  {
    title: "Sales",
    dataIndex: "sales",
    key: "sales",
  },
  {
    title: "Revenue",
    dataIndex: "revenue",
    key: "revenue",
  },
];
const data = [
  {
    key: "1",
    image: "https://remosnextjs.vercel.app/images/country/6.png",
    country: "Turkey",
    sales: 32,
    revenue: 3200,
  },
  {
    key: "2",
    image: "https://remosnextjs.vercel.app/images/country/6.png",
    country: "Pakistan",
    sales: 32,
    revenue: 3200,
  },
  {
    key: "3",
    image: "https://remosnextjs.vercel.app/images/country/6.png",
    country: "India",
    sales: 32,
    revenue: 3200,
  },
  {
    key: "4",
    image: "https://remosnextjs.vercel.app/images/country/6.png",
    country: "Japan",
    sales: 32,
    revenue: 3200,
  },
];
const TopCountryBySale = () => (
  <div>
    <p className={style.cardTitle}>Top Countries by Sales</p>
    <Table columns={columns} dataSource={data} />
  </div>
);
export default TopCountryBySale;
