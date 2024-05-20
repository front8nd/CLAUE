import React from "react";
import { Col, Row } from "antd";
import style from "./AddProductDetails.module.scss";
import { useSidebarToggler } from "../../ContextHooks/sidebarToggler";
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
export default function AddProductDetails() {
  const { TextArea } = Input;
  const { sidebarVisible } = useSidebarToggler();
  const handleButtonClick = (e) => {
    message.info("Click on left button.");
    console.log("click left button", e);
  };
  const handleMenuClick = (e) => {
    message.info("Click on menu item.");
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
  };
  const fileList = [
    {
      uid: "0",
      name: "xxx.png",
      status: "uploading",
      percent: 33,
    },
    {
      uid: "-1",
      name: "yyy.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      thumbUrl:
        "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
    {
      uid: "-2",
      name: "zzz.png",
      status: "error",
    },
  ];
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };
  return (
    <div
      className={
        sidebarVisible === false
          ? `${style.AddProductDetails} ${style.AddProductDetailsFull} `
          : style.AddProductDetails
      }
    >
      <p className={style.cardTitle}>Add Attributes</p>
      <Row gutter={12}>
        <Col s={24} md={12} lg={12}>
          <div className={style.cardBG}>
            <p className={style.apdTitle}>Add Title:</p>
            <Input placeholder="Enter Product Title"></Input>
            <p className={style.apdNote}>
              Do not exceed 20 characters when entering the product name.
            </p>
            <div className={style.apdContainer}>
              <p className={style.apdTitle}>Select Category:</p>
              <p className={style.apdTitle}>Select Color:</p>
            </div>
            <div className={style.apdContainer}>
              <Dropdown className={style.antDropdownFull} menu={menuProps}>
                <Button>
                  <Space>
                    Button
                    <DownOutlined />
                  </Space>
                </Button>
              </Dropdown>
              <Dropdown className={style.antDropdownFull} menu={menuProps}>
                <Button>
                  <Space>
                    Button
                    <DownOutlined />
                  </Space>
                </Button>
              </Dropdown>
            </div>
            <div className={style.apdContainer}>
              <p className={style.apdTitle}>Select Size:</p>
              <p className={style.apdTitle}> Select Brand:</p>
            </div>
            <div className={style.apdContainer}>
              <Dropdown className={style.antDropdownFull} menu={menuProps}>
                <Button>
                  <Space>
                    Button
                    <DownOutlined />
                  </Space>
                </Button>
              </Dropdown>
              <Dropdown className={style.antDropdownFull} menu={menuProps}>
                <Button>
                  <Space>
                    Button
                    <DownOutlined />
                  </Space>
                </Button>
              </Dropdown>
            </div>
            <p className={style.apdTitle}>Enter Description:</p>
            <TextArea rows={4} />
          </div>
        </Col>
        <Col s={24} md={12} lg={12}>
          <div className={style.cardBG}>
            <p className={style.apdTitle}>Upload Images:</p>
            <p className={style.apdNote}>
              You need to add at least 4 images. Pay attention to the quality of
              the pictures you add, comply with the background color standards.
              Pictures must be in certain dimensions. Notice that the product
              shows all the details
            </p>
            <>
              <Upload
                action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                listType="picture"
                defaultFileList={[...fileList]}
              >
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </>
            <Divider />
            <div className={style.apdDatePicker}>
              <p className={style.apdTitle}>Select Date:</p>
              <Space direction="vertical">
                <DatePicker
                  format={{
                    format: "YYYY-MM-DD",
                    type: "mask",
                  }}
                  onChange={onChange}
                />
              </Space>
            </div>
            <Divider />

            <Button type="primary" className={style.adpButton}>
              Add Product
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
}
