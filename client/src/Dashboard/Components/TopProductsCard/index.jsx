import React from "react";
import { Table } from "antd";
import style from "./TopProductsCard.module.scss";
const columns = [
  {
    title: "Product Image",
    dataIndex: "image",
    key: "image",
    render: (text) => (
      <img src={text} alt="product" style={{ width: 50, height: 50 }} />
    ),
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
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
    image: "https://remosnextjs.vercel.app/images/products/1.png",
    title: "John Brown",
    sales: 32,
    revenue: 3200,
  },
  {
    key: "2",
    image: "https://remosnextjs.vercel.app/images/products/1.png",
    title: "Lorem Ipsum",
    sales: 32,
    revenue: 3200,
  },
  {
    key: "3",
    image: "https://remosnextjs.vercel.app/images/products/1.png",
    title: "Whie Nuwnw",
    sales: 32,
    revenue: 3200,
  },
  {
    key: "4",
    image: "https://remosnextjs.vercel.app/images/products/1.png",
    title: "Kikur Idjs",
    sales: 32,
    revenue: 3200,
  },
];
const TopProductsCard = () => (
  <div>
    <p className={style.cardTitle}>Top Selling</p>
    <Table columns={columns} dataSource={data} />
  </div>
);
export default TopProductsCard;
