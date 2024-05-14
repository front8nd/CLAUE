import React from "react";
import "./style.css";
import Logo from "/src/assets/logo_claue.png";
import { IoLocationOutline } from "react-icons/io5";
import { MdMailOutline } from "react-icons/md";
import { MdOutlinePhone } from "react-icons/md";
import { TiSocialFacebook } from "react-icons/ti";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaPinterestP } from "react-icons/fa";
import payments from "/src/assets/payments.png";
export default function MainFooter() {
  return (
    <div className="main-footer">
      <div className="site-info">
        <img src={Logo} alt="claue" />
        <div className="site-info-address">
          <IoLocationOutline className="site-info-icon" />
          <p>184 Main Rd E, St Albans VIC 3021, Australia</p>
        </div>
        <div className="site-info-email">
          <MdMailOutline className="site-info-icon" />
          <a href="mailto:contact@company.com">contact@company.com</a>
        </div>
        <div className="site-info-phone">
          <MdOutlinePhone className="site-info-icon" />
          <a href="tele:+0012233456">+0012233456</a>
        </div>
        <div className="site-info-social">
          <a href="#">
            <TiSocialFacebook className="site-info-social-icon" />
          </a>
          <a href="#">
            <FaXTwitter className="site-info-social-icon" />
          </a>

          <a href="#">
            <FaInstagram className="site-info-social-icon" />
          </a>

          <a href="#">
            <FaPinterestP className="site-info-social-icon" />
          </a>
        </div>
      </div>
      <div className="site-categories">
        <h3>Categories</h3>
        <div className="site-categories-links">
          <a href="#">Men</a>
          <a href="#">Women</a>
          <a href="#">Accessories</a>
          <a href="#">Shoes</a>
          <a href="#">Denim</a>
          <a href="#">Dress</a>
        </div>
      </div>
      <div className="site-categories">
        <h3>Infomation</h3>
        <div className="site-categories-links">
          <a href="#">About Us</a>
          <a href="#">Contact Us</a>
          <a href="#">Terms & Conditions</a>
          <a href="#">Returns & Exchanges</a>
          <a href="#">Shipping & Delivery</a>
          <a href="#">Privacy Policy</a>
        </div>
      </div>
      <div className="site-categories">
        <h3>Quick Links</h3>
        <div className="site-categories-links">
          <a href="#">Store Location</a>
          <a href="#">My Account</a>
          <a href="#">Accessories</a>
          <a href="#">Orders Tracking</a>
          <a href="#">Size Guide</a>
          <a href="#">FAQs</a>
        </div>
      </div>
      <div className="site-categories">
        <h3>Newsletter</h3>
        <p className="newsletter-text">
          Subscribe to our newsletter and get 10% off your first purchase
        </p>
        <div className="subscribe-box">
          <input type="text" placeholder="Enter Your Email"></input>
          <button className="subscribe-btn">Subscribe</button>
        </div>
        <div className="payment-img">
          <img src={payments} alt="" />
        </div>
      </div>
    </div>
  );
}
