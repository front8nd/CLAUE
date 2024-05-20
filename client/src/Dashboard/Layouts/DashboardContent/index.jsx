import React from "react";
import style from "./DashboardContent.module.scss";
import { Col, Row } from "antd";
import TotalSalesCard from "../../Components/TotalSalesCard";
import TotalIncomeCard from "../../Components/TotalIncomeCard";
import OrdersPaidCard from "../../Components/OrdersPaidCard";
import TotalVisitorCard from "../../Components/TotalVisitorCard";
import YearlySalesGraph from "../../Components/YearlySalesGraph";
import TopProductsCard from "../../Components/TopProductsCard";
import TopCountryBySale from "../../Components/TopCountryBySale";
import YearlyIncomeGraph from "../../Components/YearlyIncomeGraph";
import { useSidebarToggler } from "../../ContextHooks/sidebarToggler";
export default function DashboardContent() {
  const { sidebarVisible } = useSidebarToggler();

  return (
    <div
      className={
        sidebarVisible !== true
          ? `${style.DashboardContent} ${style.DashboardContentFull} `
          : style.DashboardContent
      }
    >
      <Row gutter={8}>
        <Col xs={24} sm={12} lg={12}>
          <div className={style.cardBG}>
            <TotalSalesCard />
          </div>
        </Col>
        <Col xs={24} sm={12} lg={12}>
          <div className={style.cardBG}>
            <TotalIncomeCard />
          </div>
        </Col>
      </Row>
      <Row gutter={8}>
        <Col xs={24} sm={12} lg={12}>
          <div className={style.cardBG}>
            <OrdersPaidCard />
          </div>
        </Col>
        <Col xs={24} sm={12} lg={12}>
          <div className={style.cardBG}>
            <TotalVisitorCard />
          </div>
        </Col>
      </Row>
      <Row gutter={8}>
        <Col span={24}>
          <div className={style.cardBG}>
            <YearlySalesGraph />
          </div>
        </Col>
      </Row>
      <Row gutter={8}>
        <Col span={24}>
          <div className={style.cardBG}>
            <YearlyIncomeGraph />
          </div>
        </Col>
      </Row>
      <Row gutter={8}>
        <Col xs={24} sm={12} lg={12}>
          <div className={style.cardBG}>
            <TopProductsCard />
          </div>
        </Col>
        <Col xs={24} sm={12} lg={12}>
          <div className={style.cardBG}>
            <TopCountryBySale />
          </div>
        </Col>
      </Row>
    </div>
  );
}
