import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
export default function Recipt({ data }) {
  console.log("x", data);
  return (
    <div className="Recipt">
      <div className="recpit-container">
        <div id="success">
          <div className="box-heading">
            <h4>Order Confirmed</h4>
          </div>
          <p>
            <div className="r-body-text">
              We're excited to inform you that your order has been successfully
              confirmed! Here is the Order ID:{" "}
              <span className="order-id">{data.id}</span>
            </div>
            <div className="r-body-text">
              Your items will be prepared for shipment and will be on their way
              to you soon.
            </div>
            <div className="r-body-text">
              If you have any questions or concerns regarding your order, please
              don't hesitate to contact us at{" "}
              <a href={"mail:orders@example.com"}>orders@example.com</a>.
            </div>
          </p>
        </div>
        <div id="details-box">
          <div id="sub-box">
            <div className="subbox-heading">
              <h4>Customer Details</h4>
            </div>
            <div className="r-detail-sec">
              <label className="r-label">Name:</label>
              <p className="r-detail">{data.customer_details.name}</p>
            </div>
            <div className="r-detail-sec">
              <label className="r-label">Email:</label>
              <p className="r-detail">{data.customer_details.email}</p>
            </div>
            <div className="r-detail-sec">
              <label className="r-label">Address:</label>
              <p className="r-detail" style={{ textAlign: "left" }}>
                {data.customer_details.address.city},
                {data.customer_details.address.state}
                {data.customer_details.address.postal_code === null
                  ? ""
                  : `${data.customer_details.address.postal_code},`}
                {data.customer_details.address.country}
              </p>
            </div>
          </div>
          <div id="sub-box">
            <div className="subbox-heading">
              <h4>Order Details</h4>
            </div>
            <div className="r-detail-sec">
              <label className="r-label">Sub Total: </label>
              <p className="r-detail">
                {Math.round(data.amount_subtotal / 83)}$
              </p>
            </div>
            <div className="r-detail-sec">
              <label className="r-label">Shipping Cost:</label>
              <p className="r-detail">
                {Math.round(data.shipping_cost?.amount_total / 83)}$
              </p>
            </div>
            <div className="r-detail-sec">
              <label className="r-label">Discount:</label>
              <p className="r-detail">
                {data.total_details.total_disount != 0
                  ? Math.round(data.total_details.amount_discount / 83)
                  : 0}
                $
              </p>
            </div>
            <div className="r-detail-sec">
              <label className="r-label">Total Amount Paid:</label>
              <p className="r-detail">{Math.round(data.amount_total / 83)}$</p>
            </div>
            <div className="r-detail-sec">
              <label className="r-label">Payment Method:</label>
              <p className="r-detail">
                {data.payment_method_types[0].toUpperCase()}
              </p>
            </div>
          </div>
        </div>
        <div className="shop-more">
          <Link to={"/"}>
            <button className="continue-shopping">Continue Shopping</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
