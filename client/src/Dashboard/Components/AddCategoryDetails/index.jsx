import React, { useState } from "react";
import { useSidebarToggler } from "../../ContextHooks/sidebarToggler";
import style from "./AddCategoryDetails.module.scss";
import { DownOutlined, UploadOutlined } from "@ant-design/icons";
import { Input, Button, message, Space, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import Pagination from "../Pagination";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { POST_Category } from "../../../API/POST_request";
import { getProductsFirebase } from "../../../Redux/ProductsSlice";

export default function AddCategoryDetails() {
  const { sidebarVisible } = useSidebarToggler();
  const dispatch = useDispatch();
  const categoryArray = useSelector((state) => state.Products.arrayCategory);
  const [newCat, setNewCat] = useState("");
  const submitHandlerCat = async (e) => {
    openMessage({ content: "Adding...", type: "loading" });
    const data = {
      id: uuidv4(),
      name: newCat,
      subcategories: {},
    };
    await POST_Category(data);
    dispatch(getProductsFirebase());
    openMessage({ content: "Added", type: "success" });
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

  const newCategory = categoryArray.map((item) => ({
    label: item.category.toUpperCase(),
    value: item.category,
  }));

  return (
    <div
      className={
        sidebarVisible === false
          ? `${style.AddCategoryDetails} ${style.AddCategoryDetailsFull} `
          : style.AddCategoryDetails
      }
    >
      {contextHolder}
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
            name="category"
            value={newCat}
            onChange={(e) => {
              setNewCat(e.target.value);
            }}
          ></Input>
        </div>
        <Space>
          <Select
            className={style.antDropdown}
            options={newCategory}
            style={{
              width: 170,
              height: 40,
            }}
            onChange={(value) => changeHandler("category", value)}
            required
            placeholder="Select a Category"
          ></Select>
        </Space>
        <div className={style.acContainer}>
          <p className={style.acTitle}>Add Category Description:</p>
          <TextArea
            placeholder="Enter description.."
            className={style.acInput}
            rows={4}
          />
        </div>
        <div className={style.acSubmit}>
          <Button
            onClick={(e) => {
              e.preventDefault();
              submitHandlerCat();
            }}
            type="primary"
            className={style.acButton}
          >
            Add Category
          </Button>
        </div>
      </div>
      <div className={style.cardBG}>
        <div className={style.acContainer}>
          <p className={style.acTitle}>Add Sub Category:</p>
          <Input
            placeholder="Enter Category Title"
            className={style.acInput}
          ></Input>
        </div>
        <div className={style.acContainer}>
          <p className={style.acTitle}>Add Sub Category Description:</p>
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
