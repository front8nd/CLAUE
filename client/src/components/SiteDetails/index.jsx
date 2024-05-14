import React from "react";
import { LiaShippingFastSolid } from "react-icons/lia";
import { GrSupport } from "react-icons/gr";
import { FaArrowRotateRight } from "react-icons/fa6";
import { SiFsecure } from "react-icons/si";

import "./style.css";
export default function SiteDetails() {
  return (
    <div>
      <div className="trending-text">
        <p className="trending"> DELIVERY & RETURNS</p>
        <p className="t-text">Custom static block for product detail</p>
      </div>
      <div className="site-details">
        <div className="sd-con">
          <LiaShippingFastSolid className="sd-icon" />
          <div className="sd-details">
            <h3 className="sd-title">FREE SHIPPING</h3>
            <p className="sd-content">
              Free shipping on all US order or order above $200.
            </p>
          </div>
        </div>
        <div className="sd-con">
          <GrSupport className="sd-icon" />
          <div className="sd-details">
            <h3 className="sd-title">SUPPORT 24/7</h3>
            <div className="sd-content">
              <p>Contact us 24 hours a day, 7 days a week.</p>
            </div>
          </div>
        </div>
        <div className="sd-con">
          <FaArrowRotateRight className="sd-icon" />
          <div className="sd-details">
            <h3 className="sd-title">30 DAYS RETURN</h3>
            <p className="sd-content">
              Simply return it within 30 days for an exchange.
            </p>
          </div>
        </div>
        <div className="sd-con">
          <SiFsecure className="sd-icon" />
          <div className="sd-details">
            <h3 className="sd-title">100% PAYMENT SECURE</h3>
            <p className="sd-content">We ensure secure payment with PEV.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
