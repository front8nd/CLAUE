import React from "react";
import { useSidebarToggler } from "../../ContextHooks/sidebarToggler";
import style from "./AddCategoryDetails.module.scss";
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
} from "antd";
import TextArea from "antd/es/input/TextArea";
export default function AddCategoryDetails() {
  const { sidebarVisible } = useSidebarToggler();

  return (
    <div
      className={
        sidebarVisible === false
          ? `${style.AllCategoryDetails} ${style.AllCategoryDetailsFull} `
          : style.AllCategoryDetails
      }
    >
      <p className={style.cardTitle}>All Attributes</p>
      <div className={style.cardBG}>
        <div className={style.acContainer}>
          <p className={style.acTitle}>Add Category:</p>
          <Input placeholder="Enter Category Title"></Input>
          <p className={style.acTitle}>Add Category Description:</p>
          <TextArea rows={4} />
          <Button type="primary" className={style.acButton}>
            Add Product
          </Button>
        </div>
      </div>
    </div>
  );
}
