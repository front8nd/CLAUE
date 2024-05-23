import React, { useState } from "react";
import { Col, Row } from "antd";
import style from "./AddProductDetails.module.scss";
import { useSidebarToggler } from "../../ContextHooks/sidebarToggler";
import { DownOutlined, UploadOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Input,
  Dropdown,
  Button,
  message,
  Space,
  Image,
  Upload,
  DatePicker,
  Divider,
  Select,
} from "antd";
import { FiUploadCloud } from "react-icons/fi";
import Pagination from "../Pagination";
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
export default function AddProductDetails() {
  const { TextArea } = Input;
  const { sidebarVisible } = useSidebarToggler();

  const handleMenuClick = (e) => {
    message.info("selected", e.label);
    console.log("click", e);
  };
  const items = [
    {
      key: "1",
      label: "Group title",
      children: [
        {
          key: "1-1",
          label: "1st menu item",
        },
        {
          key: "1-2",
          label: "2nd menu item",
        },
      ],
    },
    {
      key: "2",
      label: "sub menu",
      children: [
        {
          key: "2-1",
          label: "3rd menu item",
        },
        {
          key: "2-2",
          label: "4th menu item",
        },
      ],
    },
    {
      key: "3",
      label: "disabled sub menu",
      children: [
        {
          key: "3-1",
          label: "5d menu item",
        },
        {
          key: "3-2",
          label: "6th menu item",
        },
      ],
    },
  ];
  const menuProps = {
    items,
    onClick: handleMenuClick,
    selectable: true,
    defaultSelectedKeys: ["1"],
  };

  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
    {
      uid: "-2",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
    {
      uid: "-3",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
    {
      uid: "-4",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
    {
      uid: "-xxx",
      percent: 50,
      name: "image.png",
      status: "uploading",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
    {
      uid: "-5",
      name: "image.png",
      status: "error",
    },
  ]);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
        cursor: "pointer",
      }}
      type="button"
    >
      <FiUploadCloud style={{ fontSize: "30px", color: "#2275fc" }} />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Drop your images here or <p style={{ color: "#007aff" }}>Click Here</p>
      </div>
    </button>
  );
  return (
    <div
      className={
        sidebarVisible === false
          ? `${style.AddProductDetails} ${style.AddProductDetailsFull} `
          : style.AddProductDetails
      }
    >
      <div className={style.pageHeader}>
        <p className={style.cardTitle}>Add New Product</p>
        <Pagination />
      </div>
      <Row>
        <Col xs={24} s={24} md={12} lg={12}>
          <div className={style.cardBG}>
            <p className={style.apdTitle}>Add Title:</p>
            <Input
              className={style.apdInput}
              placeholder="Enter Product Title"
            ></Input>
            <p className={style.apdNote}>
              Do not exceed 20 characters when entering the product name.
            </p>
            <div className={style.apdAttributes}>
              <div className={style.apdContainer}>
                <p className={style.apdTitle}>Select Category:</p>
                <Dropdown className={style.antDropdown} menu={menuProps}>
                  <Button>
                    <Space className={style.apdDropdownGap}>
                      Button
                      <DownOutlined />
                    </Space>
                  </Button>
                </Dropdown>
              </div>
              <div className={style.apdContainer}>
                <p className={style.apdTitle}>Select Color:</p>
                <Dropdown className={style.antDropdown} menu={menuProps}>
                  <Button>
                    <Space className={style.apdDropdownGap}>
                      Button
                      <DownOutlined />
                    </Space>
                  </Button>
                </Dropdown>
              </div>
            </div>
            <div className={style.apdAttributes}>
              <div className={style.apdContainer}>
                <p className={style.apdTitle}>Select Size:</p>
                <Dropdown className={style.antDropdown} menu={menuProps}>
                  <Button>
                    <Space className={style.apdDropdownGap}>
                      Button
                      <DownOutlined />
                    </Space>
                  </Button>
                </Dropdown>
              </div>
              <div className={style.apdContainer}>
                <p className={style.apdTitle}>Select Brand:</p>
                <Dropdown className={style.antDropdown} menu={menuProps}>
                  <Button>
                    <Space className={style.apdDropdownGap}>
                      Button
                      <DownOutlined />
                    </Space>
                  </Button>
                </Dropdown>
              </div>
            </div>

            <p className={style.apdTitle}>Enter Description:</p>
            <TextArea rows={4} />
            <p className={style.apdNote}>
              Do not exceed 100 characters when entering the product name.
            </p>
          </div>
        </Col>
        <Col xs={24} s={24} md={12} lg={12}>
          <div className={style.cardBG}>
            <p className={style.apdTitle}>Upload Images:</p>
            <div className="apdImgSize">
              <Upload
                action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
              >
                {fileList.length === 4 ? null : uploadButton}
              </Upload>
              {previewImage && (
                <Image
                  wrapperStyle={{
                    display: "none",
                  }}
                  preview={{
                    visible: previewOpen,
                    onVisibleChange: (visible) => setPreviewOpen(visible),
                    afterOpenChange: (visible) =>
                      !visible && setPreviewImage(""),
                  }}
                  src={previewImage}
                />
              )}
            </div>
            <p className={style.apdNote}>
              You need to add at least 4 images. Pay attention to the quality of
              the pictures you add, comply with the background color standards.
              Pictures must be in certain dimensions. Notice that the product
              shows all the details
            </p>
            <div className={style.apdCon}>
              <div className={style.apdContainer}>
                <p className={style.apdTitle}>Select Date:</p>
                <Space direction="vertical">
                  <DatePicker
                    format={{
                      format: "YYYY-MM-DD",
                      type: "mask",
                    }}
                    onChange={onChange}
                    className={style.apdDatePickerBox}
                    placeholder="YYYY-MM-DD"
                  />
                </Space>
              </div>
              <Button type="primary" className={style.adpButton}>
                Add Product
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
