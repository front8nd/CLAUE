import React, { useEffect, useState } from "react";
import { useSidebarToggler } from "../../ContextHooks/sidebarToggler";
import style from "./TrackOrderDetails.module.scss";
import { Button, Col, Divider, Row, Steps } from "antd";
import Pagination from "../Pagination";
import { CiSearch } from "react-icons/ci";
import { GoNote } from "react-icons/go";
import axios from "axios";
import Loading from "../../../components/Loading";
export default function TrackOrderDetails() {
  const { sidebarVisible } = useSidebarToggler();
  const [sessionId, setsessionId] = useState(null);
  const [loading, setLoading] = useState(null);

  // Stripe Data
  const [stripeData, setStripeData] = useState([]);
  console.log(stripeData);
  const fetchStripeData = async () => {
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5174/TrackOrder", {
        sessionId,
      });
      setStripeData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching Stripe data:", error);
      setLoading(null);
    }
  };
  return (
    <div
      className={
        sidebarVisible === false
          ? `${style.TrackOrderDetails} ${style.TrackOrderDetailsFull} `
          : style.TrackOrderDetails
      }
    >
      <div className={style.pageHeader}>
        <p className={style.cardTitle}>Track Order</p>
        <Pagination />
      </div>
      <div className={style.cardBG}>
        <div className={style.apTextContainer}>
          <GoNote className={style.apNoteICON} />
          <p className={style.apNote}>
            Tip: search by Order ID: Each order is provided with a unique ID,
            which you can rely on to find the exact order you need.
          </p>
        </div>
        <form className={style.apContainer}>
          <div className={style.apInputBox}>
            <input
              placeholder="Search here..."
              className={style.apInput}
              name="id"
              value={sessionId}
              onChange={(e) => {
                setsessionId(e.target.value);
              }}
              required
            ></input>
            <CiSearch className={style.apInputIcon} />
          </div>
          <Button
            onClick={fetchStripeData}
            type="primary"
            className={style.apButton}
          >
            Submit
          </Button>
        </form>
        <Divider />
        {loading === false
          ? stripeData.data.map((e) => (
              <div className={style.toContainer}>
                <Row gutter={[16, 16]} style={{ placeContent: "center" }}>
                  <Col xs={24} s={24} md={4} lg={4}>
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/ecommerce-cde88.appspot.com/o/images%2F9721c17d-f962-4bf9-846e-893deee6324c%2F9.png?alt=media&token=43ba3e06-9e0a-414d-a9db-2faa5b4f2153"
                      height="130px"
                      width="130px"
                    ></img>
                  </Col>
                  <Col xs={24} s={24} md={20} lg={20}>
                    <h2>{e.description}</h2>
                    <table className={style.toTable}>
                      <tbody>
                        <tr>
                          <th>Item ID: </th>
                          <td>{e.id}</td>
                        </tr>
                        <tr>
                          <th>Quantity: </th>
                          <td>{e.description}</td>
                        </tr>
                        <tr>
                          <th>Price:</th>
                          <td>{e.amount_total}</td>
                        </tr>
                        <tr>
                          <th>Order Placed:</th>
                          <td>{e.description}</td>
                        </tr>
                      </tbody>
                    </table>
                  </Col>
                </Row>
                <Divider />
              </div>
            ))
          : ""}
      </div>
    </div>
  );
}
