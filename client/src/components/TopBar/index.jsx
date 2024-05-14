import React from "react";
import "./style.css";
import { HiOutlinePhone } from "react-icons/hi2";
import { TfiEmail } from "react-icons/tfi";

export default function TopBar() {
  return (
    <div className="top-bar">
      <div className="contect-details">
        <div className="phone">
          <a href="tel:+0123456789" className="link">
            <HiOutlinePhone className="icon" />
            +0123456789
          </a>
        </div>
        <div className="email">
          <a href="mailto:claue@domain.com" className="link">
            <TfiEmail className="icon" />
            claue@domain.com
          </a>
        </div>
      </div>
      <div className="discount">
        <p>
          Summer sale discount off <span className="red">50%</span>!
          <span>
            <a className="link" href="#">
              {" "}
              Shop Now
            </a>
          </span>
        </p>
      </div>
      <div className="top-bar-dropdown">
        <div className="language-selection link">
          <select name="language" className="language link">
            <option value="English" className="language-option">
              English
            </option>
            <option value="Urdu" className="language-option">
              Urdu
            </option>
          </select>
        </div>
        <div className="currency-selection link">
          <select name="currency" className="currency link">
            <option value="USD" className="currency-option">
              USD - US Dollar
            </option>
            <option value="EUR" className="currency-option">
              EUR - Euro
            </option>
          </select>
        </div>
      </div>
    </div>
  );
}
