import React, { useEffect, useState } from "react";
import { useSidebarToggler } from "../../ContextHooks/sidebarToggler";
import style from "./TrackOrderDetails.module.scss";
import { Button, Col, Divider, Row, Steps, message } from "antd";
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
  const fetchStripeData = async () => {
    try {
      setLoading(true);
      openMessage({ content: "Fetching..", type: "loading" });

      const response = await axios.post(
        "http://localhost:5174/api/stripe/TrackOrder",
        {
          sessionId,
        }
      );
      setStripeData(response.data);
      setLoading(false);
      openMessage({ content: "Completed", type: "success" });
    } catch (error) {
      console.error("Error fetching Stripe data:", error);
      setLoading(false);
      openMessage({ content: "Error Finding Item", type: "error" });
    }
  };
  const calculateDate = (e) => {
    const orderDate = new Date(e * 1000);
    const formattedDate = orderDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    return formattedDate;
  };
  // Custom Message Pop

  const [messageApi, contextHolder] = message.useMessage();
  const openMessage = ({ content, type }) => {
    messageApi.open({
      key: "messageBox",
      type: type,
      content: content,
    });
  };
  return (
    <div
      className={
        sidebarVisible === false
          ? `${style.TrackOrderDetails} ${style.TrackOrderDetailsFull} `
          : style.TrackOrderDetails
      }
    >
      {contextHolder}
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
        {loading === false && stripeData ? (
          stripeData.data.map((e) => (
            <div className={style.toContainer}>
              <Row gutter={[16, 16]} style={{ placeContent: "center" }}>
                <Col xs={24} s={24} md={6} lg={6}>
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/ecommerce-cde88.appspot.com/o/images%2F9721c17d-f962-4bf9-846e-893deee6324c%2F9.png?alt=media&token=43ba3e06-9e0a-414d-a9db-2faa5b4f2153"
                    height="200px"
                    width="200px"
                  ></img>
                </Col>
                <Col xs={24} s={24} md={18} lg={18}>
                  <h2>{e.description}</h2>
                  <table className={style.toTable}>
                    <tbody>
                      <tr>
                        <th>Order Placed:</th>
                        <td>{calculateDate(e.price.created)}</td>
                      </tr>
                      <tr>
                        <th>Unit Price:</th>
                        <td>{Math.round(e.price.unit_amount / 80)}</td>
                      </tr>
                      <tr>
                        <th>Quantity: </th>
                        <td>{e.quantity}</td>
                      </tr>
                      <tr>
                        <th>Sub Total:</th>
                        <td>{Math.round(e.amount_subtotal / 80)}</td>
                      </tr>
                      <tr>
                        <th>Disount:</th>
                        <td>{Math.round(e.amount_discount / 80)}</td>
                      </tr>
                      <tr>
                        <th>Tax:</th>
                        <td>{Math.round(e.amount_tax / 80)}</td>
                      </tr>
                      <tr>
                        <th>Total:</th>
                        <td>{Math.round(e.amount_total / 80)}</td>
                      </tr>
                    </tbody>
                  </table>
                </Col>
              </Row>
              <Divider />
            </div>
          ))
        ) : (
          <div className={style.toContainer}> </div>
        )}
      </div>
    </div>
  );
}
