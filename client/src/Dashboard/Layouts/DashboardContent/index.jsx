import React from "react";
import style from "./DashboardContent.module.scss";
import { Col, Row } from "antd";

export default function DashboardContent() {
  return (
    <div className={style.DashboardContent}>
      <Row gutter={16}>
        <Col span={12}>
          <div className={style.DashboardCard}>Card 1</div>
        </Col>
        <Col span={12}>
          <div className={style.DashboardCard}>Card 2</div>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <div className={style.DashboardCard}>Card 3</div>
        </Col>
        <Col span={12}>
          <div className={style.DashboardCard}>Card 4</div>
        </Col>
      </Row>
    </div>
  );
}
