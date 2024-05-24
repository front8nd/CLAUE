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
import Pagination from "../Pagination";
import { TfiPlus } from "react-icons/tfi";
import { CiSearch } from "react-icons/ci";
import { GoNote } from "react-icons/go";
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
            ></input>
            <CiSearch className={style.apInputIcon} />
          </div>
          <Button type="primary" className={style.apButton}>
            Submit
          </Button>
        </div>
        <Divider />
        <div className={style.apTextContainer}>
          <GoNote className={style.apNoteICON} />
          <p className={style.apNote}>
            Tip: search by Order ID: Each order is provided with a unique ID,
            which you can rely on to find the exact order you need.
          </p>
        </div>
        <div style={{ padding: "0 30px", marginBottom: "20px" }}>
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
