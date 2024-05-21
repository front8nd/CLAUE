import React from "react";
import { useSidebarToggler } from "../../ContextHooks/sidebarToggler";
import style from "./TrackOrderDetails.module.scss";
import { DownOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Input,
  Dropdown,
  Button,
  message,
  Space,
  Upload,
  DatePicker,
  Divider,
  Row,
  Col,
  Steps,
} from "antd";
export default function TrackOrderDetails() {
  const { sidebarVisible } = useSidebarToggler();
  const description = "This is a description";

  return (
    <div
      className={
        sidebarVisible === false
          ? `${style.TrackOrderDetails} ${style.TrackOrderDetailsFull} `
          : style.TrackOrderDetails
      }
    >
      <p className={style.cardTitle}>Add Attributes</p>
      <div className={style.cardBG}>
        <div className={style.toContainer}>
          <p className={style.toTitle}>Type Order ID:</p>
          <Input placeholder="Enter Tracking ID"></Input>
          <Button type="primary" className={style.toButton}>
            Submit
          </Button>
        </div>
        <div style={{ padding: "20px" }} className={style.cardBG}>
          <Steps
            current={1}
            status="wait"
            items={[
              {
                title: "Order Placed",
                description,
              },
              {
                title: "Delivery in Process",
                description,
              },
              {
                title: "Completed",
                description,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
