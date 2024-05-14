import React from "react";
import "./style.css";
import women from "/src/assets/women.jpg";
import footwear from "/src/assets/footwear.jpg";
import watches from "/src/assets/watches.png";
import accessories from "/src/assets/accessories.jpg";
import { Link } from "react-router-dom";
export default function FeaturedCategories() {
  return (
    <div className="featured-categories">
      <div className="women">
        <div className="women-img-div">
          <img src={women} className="women-img" />
        </div>
        <Link to={"/category/women"} className="women-link">
          <button className="women-button">Shop Now</button>
        </Link>
      </div>
      <div className="footwear">
        <div className="footwear-img-div">
          <img src={footwear} className="footwear-img" />
        </div>
        <Link to={"/category/footwear"} className="footwear-link">
          <button className="footwear-button">Shop Now</button>
        </Link>
      </div>
      <div className="watches">
        <div className="watches-img-div">
          <img src={watches} className="watches-img" />
        </div>
        <Link to={"/category/watches"} className="watches-link">
          <button className="watches-button">Shop Now</button>
        </Link>
      </div>
      <div className="accessories">
        <div className="accessories-img-div">
          <img src={accessories} className="accessories-img" />
        </div>
        <Link to={"/category/accessories"} className="accessories-link">
          <button className="accessories-button">Shop Now</button>
        </Link>
      </div>
    </div>
  );
}
