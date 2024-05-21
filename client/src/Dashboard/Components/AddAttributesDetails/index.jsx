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
      <p className={style.cardTitle}>Add Attributes</p>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12} lg={12}>
          <div className={style.cardBG}>
            <div className={style.adContainer}>
              <p className={style.adTitle}>Add Color:</p>
              <Input placeholder="Enter Color Title"></Input>
              <Button type="primary" className={style.adButton}>
                Add Color
              </Button>
            </div>
          </div>
        </Col>
        <Col xs={24} md={12} lg={12}>
          <div className={style.cardBG}>
            <div className={style.adContainer}>
              <p className={style.adTitle}>Add Size:</p>
              <Input placeholder="Enter Size Title"></Input>
              <Button type="primary" className={style.adButton}>
                Add Size
              </Button>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={24} md={12} lg={12}>
          <div className={style.cardBG}>
            <div className={style.adContainer}>
              <p className={style.adTitle}>Add Size:</p>
              <Input placeholder="Enter Brand Title"></Input>
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
