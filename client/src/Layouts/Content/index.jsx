import React from "react";
import FeaturedCategories from "../../components/FeaturedCategories";
import ProductSection from "../../components/ProductSection";
import "./style.css";
import Deals from "../../components/Deals";
export default function Content() {
  return (
    <div>
      <FeaturedCategories />
      <div className="trending-text">
        <p className="trending">TRENDING</p>
        <p className="t-text">Top view in this week</p>
      </div>
      <ProductSection />
      <Deals />
      <div className="trending-text">
        <p className="trending">BEST SELLER</p>
        <p className="t-text">Top sale in this week</p>
      </div>
      <ProductSection />
    </div>
  );
}
