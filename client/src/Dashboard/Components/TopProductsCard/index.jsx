import React from "react";
import { Table } from "antd";
import style from "./TopProductsCard.module.scss";
const columns = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    render: (text, image) => {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontWeight: "bold",
            marginRight: "20px",
          }}
        >
          <img
            src={image.image}
            alt="product"
            style={{
              width: 40,
              height: 40,
              marginRight: 10,
              flexShrink: 0,
              padding: "5px",
              borderRadius: "10px",
              background: "#eff4f8",
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              textWrap: "nowrap",
              minWidth: "180px",
            }}
          >
            {text}
            <div>
              <span
                style={{
                  fontSize: "12px",
                  color: "#95989d",
                  display: "flex",
                  textWrap: "nowrap",
                }}
              >
                100 Items
              </span>
            </div>
          </div>
        </div>
      );
    },
  },
  {
    title: "Coupon Code",
    dataIndex: "coupon",
    key: "coupon",
    render: (record) => (
      <div style={{ marginRight: "20px" }}>
        <span
          style={{
            fontSize: "12px",
            color: "#95989d",
            display: "flex",
            textWrap: "nowrap",
          }}
        >
          Coupon Code
        </span>
        {record}
      </div>
    ),
  },
  {
    title: "Country",
    dataIndex: "country",
    key: "country",
    render: (record) => (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginRight: "20px",
        }}
      >
        <img height="20px" width="20px" src={record} alt={record}></img>
      </div>
    ),
  },
  {
    title: "Profit",
    dataIndex: "profit",
    key: "profit",
    render: (record, base) => (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginRight: "20px",
        }}
      >
        <span style={{ fontWeight: "bold" }}>-{record}</span>
        <span
          style={{ fontSize: "12px", color: "#95989d", textWrap: "nowrap" }}
        >
          {base.base}
        </span>
      </div>
    ),
  },
];
const data = [
  {
    key: "1",
    image: "https://remosnextjs.vercel.app/images/products/1.png",
    title: "Patimax Fragrance Long",
    coupon: "Sflat",
    country: "https://remosnextjs.vercel.app/images/country/3.png",
    profit: "15%",
    base: "27$",
  },
  {
    key: "2",
    image: "https://remosnextjs.vercel.app/images/products/2.png",
    title: "Nulo MedalSeries Adult Cat",
    coupon: "Sflat",
    country: "https://remosnextjs.vercel.app/images/country/1.png",
    profit: "15%",
    base: "27$",
  },
  {
    key: "3",
    image: "https://remosnextjs.vercel.app/images/products/3.png",
    title: "Pedigree Puppy Dry Dog",
    coupon: "Sflat",
    country: "https://remosnextjs.vercel.app/images/country/2.png",
    profit: "15%",
    base: "27$",
  },
  {
    key: "4",
    image: "https://remosnextjs.vercel.app/images/products/4.png",
    title: "Biscoito Premier Cookie",
    coupon: "Sflat",
    country: "https://remosnextjs.vercel.app/images/country/4.png",
    profit: "15%",
    base: "27$",
  },
  {
    key: "4",
    image: "https://remosnextjs.vercel.app/images/products/5.png",
    title: "Pedigree Adult Dry Dog",
    coupon: "Sflat",
    country: "https://remosnextjs.vercel.app/images/country/5.png",
    profit: "15%",
    base: "27$",
  },
];
const TopProductsCard = () => (
  <div>
    <h5 className={style.cardTitle}>Top Selling Products</h5>
    <Table
      columns={columns}
      dataSource={data}
      className="customTable_Card"
      virtual
    />
  </div>
);
export default TopProductsCard;
