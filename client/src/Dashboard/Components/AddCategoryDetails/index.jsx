import React, { useEffect, useState } from "react";
import { useSidebarToggler } from "../../ContextHooks/sidebarToggler";
import style from "./AddCategoryDetails.module.scss";
import { Input, Button, message, Select, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import Pagination from "../Pagination";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { POST_Category } from "../../../API/POST_request";
import { getProductsFirebase } from "../../../Redux/ProductsSlice";
import { database } from "../../../firebase";
import { ref as dbRef, push, set } from "firebase/database";
export default function AddCategoryDetails() {
  const { sidebarVisible } = useSidebarToggler();
  const dispatch = useDispatch();
  const categoryArray = useSelector((state) => state.Products.arrayCategory);
  const [newCat, setNewCat] = useState("");
  const [newSubCat, setNewSubCat] = useState("");
  const [parentCategory, setParentCategory] = useState(null);

  // Add New Category
  const submitHandlerCat = async () => {
    openMessage({ content: "Adding...", type: "loading" });
    const data = {
      id: uuidv4(),
      name: newCat,
      subcategories: {},
    };
    await POST_Category(data);
    dispatch(getProductsFirebase());
    setNewCat(null);
    openMessage({ content: "Added", type: "success" });
  };

  // Add New Sub Category
  const submitHandlerSubCat = async () => {
    openMessage({ content: "Adding...", type: "loading" });
    const newSubCategoryData = {
      id: uuidv4(),
      name: newSubCat,
    };

    const categoryRef = dbRef(
      database,
      `categories/${parentCategoryDetails.firebaseId}/subcategories`
    );

    try {
      const newSubcategoryRef = push(categoryRef);
      await set(newSubcategoryRef, newSubCategoryData);
      dispatch(getProductsFirebase());
      setNewSubCat(null);
      openMessage({ content: "Added", type: "success" });
      console.log("Subcategory added successfully!");
    } catch (error) {
      openMessage({ content: "Failed", type: "error" });
      console.error("Error adding subcategory:", error);
    }
  };

  // Get Parent Category Details
  const [parentCategoryDetails, setParentCategoryDetails] = useState(null);
  const [subCatList, setSubCatList] = useState([]);

  useEffect(() => {
    const getParentCategory = categoryArray.find((e) => {
      if (e.category === parentCategory) return e.firebaseId;
    });
    if (getParentCategory) {
      setSubCatList(
        getParentCategory.subCategory.map((subCat) => ({
          label: subCat.subCategory.toUpperCase(),
          value: subCat.subCategory,
        }))
      );
    } else {
      setSubCatList([]);
    }
    setParentCategoryDetails(getParentCategory);
  }, [parentCategory, categoryArray]);

  // Custom Message Pop
  const [messageApi, contextHolder] = message.useMessage();
  const openMessage = ({ content, type }) => {
    messageApi.open({
      key: "messageBox",
      type: type,
      content: content,
    });
  };

  //Category Array
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
        <div className={style.acContainer} style={{ margin: "20px 0" }}>
          <p className={style.acTitle}>Category List</p>
          <Space middle>
            <Select
              className={style.antDropdown}
              options={newCategory}
              style={{
                width: 200,
                height: 50,
              }}
              name="category"
              value={parentCategory}
              onChange={(value) => {
                setParentCategory(value);
              }}
              placeholder="Select a Category"
            ></Select>
          </Space>
        </div>
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
        <div className={style.acContainer} style={{ margin: "20px 0" }}>
          <p className={style.acTitle}>Select Parent Category</p>
          <Space middle>
            <Select
              className={style.antDropdown}
              options={newCategory}
              style={{
                width: 200,
                height: 50,
              }}
              name="category"
              value={parentCategory}
              onChange={(value) => {
                setParentCategory(value);
              }}
              placeholder="Select a Category"
            ></Select>
            <Select
              className={style.antDropdown}
              options={subCatList}
              style={{
                width: 200,
                height: 50,
              }}
              value={categoryArray.subCategory}
              required
              placeholder="Select SubCategory"
            ></Select>
          </Space>
        </div>
        <div className={style.acContainer}>
          <p className={style.acTitle}>Add Sub Category:</p>
          <Input
            placeholder="Enter Category Title"
            className={style.acInput}
            name="subCategory"
            value={newSubCat}
            onChange={(e) => {
              setNewSubCat(e.target.value);
            }}
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
          <Button
            onClick={() => {
              submitHandlerSubCat();
            }}
            type="primary"
            className={style.acButton}
          >
            Add Category
          </Button>
        </div>
      </div>
    </div>
  );
}
