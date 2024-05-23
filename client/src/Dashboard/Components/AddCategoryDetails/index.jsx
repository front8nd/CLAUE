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
import Pagination from "../Pagination";
export default function AddCategoryDetails() {
  const { sidebarVisible } = useSidebarToggler();

  return (
    <div
      className={
        sidebarVisible === false
          ? `${style.AddCategoryDetails} ${style.AddCategoryDetailsFull} `
          : style.AddCategoryDetails
      }
    >
      <div className={style.pageHeader}>
        <p className={style.cardTitle}>Add New Category</p>
        <Pagination />
      </div>
      <div className={style.cardBG}>
        <div className={style.acContainer}>
          <p className={style.acTitle}>Add Category:</p>
          <Input
            placeholder="Enter Category Title"
            className={style.acInput}
          ></Input>
        </div>
        <div className={style.acContainer}>
          <p className={style.acTitle}>Add Category Description:</p>
          <TextArea
            placeholder="Enter description.."
            className={style.acInput}
            rows={4}
          />
        </div>
        <div className={style.acSubmit}>
          <Button type="primary" className={style.acButton}>
            Add Category
          </Button>
        </div>
      </div>
    </div>
  );
}
