import React, { useEffect, useState } from "react";
import { useSidebarToggler } from "../../ContextHooks/sidebarToggler";
import style from "./TrackOrderDetails.module.scss";
import { Button, Col, Divider, Row, Steps } from "antd";
import Pagination from "../Pagination";
import { CiSearch } from "react-icons/ci";
import { GoNote } from "react-icons/go";
import axios from "axios";

export default function TrackOrderDetails() {
  const { sidebarVisible } = useSidebarToggler();
  const description = "This is a description";
  const [sessionId, setsessionId] = useState(null);
  const [loading, setLoading] = useState(null);

  // Stripe Data
  const [stripeData, setStripeData] = useState([]);
  console.log(stripeData);
  const fetchStripeData = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5174/api/TrackOrder",
        { sessionId }
      );
      setStripeData(response.data);
    } catch (error) {
      console.error("Error fetching Stripe data:", error);
    }
    setLoading(false);
  };

  console.log(sessionId);
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
        <div className={style.apContainer}>
          <div className={style.apInputBox}>
            <input
              placeholder="Search here..."
              className={style.apInput}
              name="id"
              value={sessionId}
              onChange={(e) => {
                setsessionId(e.target.value);
              }}
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
        </div>
        <Divider />
        <div className={style.apTextContainer}>
          <Row>
            <Col>
              <img src="https://remosnextjs.vercel.app/images/images-section/track-oder-1.png"></img>
            </Col>
            <Col>
              <h4>{stripeData.data[0].description}</h4>
              <table>
                <tbody>
                  <tr>
                    Order ID
                    <td>{sessionId}</td>
                  </tr>
                  <tr>
                    Quantity
                    <td>{stripeData.data[0].description}</td>
                  </tr>
                  <tr>
                    Price
                    <td>{stripeData.data[0].amount_total}</td>
                  </tr>
                  <tr>
                    Order Placed <td>{stripeData.data[0].description}</td>
                  </tr>
                </tbody>
              </table>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}
