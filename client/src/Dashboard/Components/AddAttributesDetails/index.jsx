import React from "react";
import { useSidebarToggler } from "../../ContextHooks/sidebarToggler";
import style from "./AddAttributesDetails.module.scss";
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
} from "antd";
import Pagination from "../Pagination";
import TextArea from "antd/es/input/TextArea";
export default function AddAttributesDetails() {
  const { sidebarVisible } = useSidebarToggler();

  return (
    <div
      className={
        sidebarVisible === false
          ? `${style.AddAttributesDetails} ${style.AddAttributesDetailsFull} `
          : style.AddAttributesDetails
      }
    >
      <div className={style.pageHeader}>
        <p className={style.cardTitle}>Add Attributes</p>
        <Pagination />
      </div>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12} lg={12}>
          <div className={style.cardBG}>
            <div className={style.adContainer}>
              <p className={style.adTitle}>Add Size:</p>
              <Input
                placeholder="Enter Category Title"
                className={style.adInput}
              ></Input>
            </div>
            <div className={style.adContainer}>
              <p className={style.adTitle}>Add Size Description:</p>
              <TextArea
                placeholder="Enter description.."
                className={style.adInput}
                rows={4}
              />
            </div>
            <div className={style.adSubmit}>
              <Button type="primary" className={style.adButton}>
                Add Size
              </Button>
            </div>
          </div>
        </Col>
        <Col xs={24} md={12} lg={12}>
          <div className={style.cardBG}>
            <div className={style.adContainer}>
              <p className={style.adTitle}>Add Color:</p>
              <Input
                placeholder="Enter Category Title"
                className={style.adInput}
              ></Input>
            </div>
            <div className={style.adContainer}>
              <p className={style.adTitle}>Add Color Description:</p>
              <TextArea
                placeholder="Enter description.."
                className={style.adInput}
                rows={4}
              />
            </div>
            <div className={style.adSubmit}>
              <Button type="primary" className={style.adButton}>
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
              <p className={style.adTitle}>Add Brand:</p>
              <Input
                placeholder="Enter Category Title"
                className={style.adInput}
              ></Input>
            </div>
            <div className={style.adContainer}>
              <p className={style.adTitle}>Add Brand Description:</p>
              <TextArea
                placeholder="Enter description.."
                className={style.adInput}
                rows={4}
              />
            </div>
            <div className={style.adSubmit}>
              <Button type="primary" className={style.adButton}>
                Add Brand
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
