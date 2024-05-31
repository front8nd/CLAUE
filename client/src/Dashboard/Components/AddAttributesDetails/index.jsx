import React, { useEffect, useState } from "react";
import { useSidebarToggler } from "../../ContextHooks/sidebarToggler";
import style from "./AddAttributesDetails.module.scss";
import { Input, Button, message, Row, Col, Select } from "antd";
import Pagination from "../Pagination";
import TextArea from "antd/es/input/TextArea";
import { useDispatch, useSelector } from "react-redux";
import { getProductsFirebase } from "../../../Redux/ProductsSlice";
import { POST_Brand, POST_Color, POST_Size } from "../../../API/POST_request";
import { v4 as uuidv4 } from "uuid";

export default function AddAttributesDetails() {
  const { sidebarVisible } = useSidebarToggler();
  const dispatch = useDispatch();
  const colorsArray = useSelector((state) => state.Products.arrayColors);
  const sizesArray = useSelector((state) => state.Products.arraySizes);
  const brandArray = useSelector((state) => state.Products.arrayBrands);

  const [attributes, setAttributes] = useState({
    color: "",
    size: "",
    brand: "",
  });

  const changeHandler = async (e) => {
    const { name, value } = e.target;
    setAttributes({
      ...attributes,
      [name]: value,
    });
  };
  console.log(attributes);
  const submitHandlerColor = async (e) => {
    e.preventDefault();
    openMessage({ content: "Adding...", type: "loading" });

    try {
      const data = { id: uuidv4(), name: attributes.color };
      await POST_Color(data);
      dispatch(getProductsFirebase());
      openMessage({ content: "Added", type: "success" });
    } catch (error) {
      console.log(error);
      openMessage({ content: "Failed", type: "error" });
    }
    setAttributes({
      color: "",
      size: "",
      brand: "",
    });
  };

  const submitHandlerSize = async (e) => {
    e.preventDefault();
    openMessage({ content: "Adding...", type: "loading" });
    try {
      const data = { id: uuidv4(), name: attributes.size };
      await POST_Size(data);
      dispatch(getProductsFirebase());
      openMessage({ content: "Added", type: "success" });
    } catch (error) {
      console.log(error);
      openMessage({ content: "Failed", type: "error" });
    }
    setAttributes({
      color: "",
      size: "",
      brand: "",
    });
  };

  const submitHandlerBrand = async (e) => {
    e.preventDefault();
    openMessage({ content: "Adding...", type: "loading" });
    try {
      const data = { id: uuidv4(), name: attributes.brand };
      await POST_Brand(data);
      dispatch(getProductsFirebase());
      openMessage({ content: "Added", type: "success" });
    } catch (error) {
      console.log(error);
      openMessage({ content: "Failed", type: "error" });
    }
    setAttributes({
      color: "",
      size: "",
      brand: "",
    });
  };

  // Dropdown Data
  const newColor = colorsArray.map((item) => ({
    label: item.color.toUpperCase(),
    value: item.color,
  }));
  const newSize = sizesArray.map((item) => ({
    label: item.size.toUpperCase(),
    value: item.size,
  }));
  const newBrand = brandArray.map((item) => ({
    label: item.brand.toUpperCase(),
    value: item.brand,
  }));

  // Custom Message Pop

  const [messageApi, contextHolder] = message.useMessage();
  const openMessage = ({ content, type }) => {
    messageApi.open({
      key: "messageBox",
      type: type,
      content: content,
    });
  };

  useEffect(() => {}, [colorsArray, sizesArray, brandArray]);
  return (
    <div
      className={
        sidebarVisible === false
          ? `${style.AddAttributesDetails} ${style.AddAttributesDetailsFull} `
          : style.AddAttributesDetails
      }
    >
      {contextHolder}
      <div className={style.pageHeader}>
        <p className={style.cardTitle}>Add Attributes</p>
        <Pagination />
      </div>
      <Row>
        <Col xs={24} md={12} lg={12}>
          <div className={style.cardBG}>
            <div className={style.adContainer}>
              <p className={style.adTitle}>Colors List:</p>
              <Select
                className={style.antDropdown}
                options={newColor}
                style={{
                  width: 400,
                  height: 50,
                }}
                name="color"
                placeholder="Colors List"
              ></Select>
            </div>
            <div className={style.adContainer}>
              <p className={style.adTitle}>Title:</p>
              <Input
                placeholder="Enter Title"
                className={style.adInput}
                name="color"
                value={attributes.color}
                onChange={changeHandler}
              ></Input>
            </div>
            <div className={style.adContainer}>
              <p className={style.adTitle}>Description:</p>
              <TextArea
                placeholder="Enter description.."
                className={style.adInput}
                rows={4}
              />
            </div>
            <div className={style.adSubmit}>
              <Button
                onClick={submitHandlerColor}
                type="primary"
                className={style.adButton}
              >
                Add Size
              </Button>
            </div>
          </div>
        </Col>
        <Col xs={24} md={12} lg={12}>
          <div className={style.cardBG}>
            <div className={style.adContainer}>
              <p className={style.adTitle}>Size List:</p>
              <Select
                className={style.antDropdown}
                options={newSize}
                style={{
                  width: 420,
                  height: 50,
                }}
                name="size"
                placeholder="Size List"
              ></Select>
            </div>
            <div className={style.adContainer}>
              <p className={style.adTitle}>Title:</p>
              <Input
                placeholder="Enter Title"
                className={style.adInput}
                name="size"
                value={attributes.size}
                onChange={changeHandler}
              ></Input>
            </div>
            <div className={style.adContainer}>
              <p className={style.adTitle}>Description:</p>
              <TextArea
                placeholder="Enter description.."
                className={style.adInput}
                rows={4}
              />
            </div>
            <div className={style.adSubmit}>
              <Button
                onClick={submitHandlerSize}
                type="primary"
                className={style.adButton}
              >
                Add Color
              </Button>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={24} md={12} lg={12}>
          <div className={style.cardBG}>
            <div className={style.adContainer}>
              <p className={style.adTitle}>Brand List:</p>
              <Select
                className={style.antDropdown}
                options={newBrand}
                style={{
                  width: 420,
                  height: 50,
                }}
                name="brand"
                placeholder="Brand List"
              ></Select>
            </div>
            <div className={style.adContainer}>
              <p className={style.adTitle}>Title:</p>
              <Input
                placeholder="Enter Title"
                className={style.adInput}
                name="brand"
                value={attributes.brand}
                onChange={changeHandler}
              ></Input>
            </div>
            <div className={style.adContainer}>
              <p className={style.adTitle}>Description:</p>
              <TextArea
                placeholder="Enter description.."
                className={style.adInput}
                rows={4}
              />
            </div>
            <div className={style.adSubmit}>
              <Button
                onClick={submitHandlerBrand}
                type="primary"
                className={style.adButton}
              >
                Add Brand
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
