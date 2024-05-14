import React from "react";
import ProductIMGS from "../../components/ProductIMGS";
import ProductDetails from "../../components/ProductDetails";
import ProductPagination from "../../components/ProductPagination";
import "./style.css";
import ProductDetailsExtra from "../../components/ProductDetailsExtra";

export default function Product() {
  return (
    <div className="ProductLayout">
      <div className="pagination">
        <ProductPagination />
      </div>
      <div className="PRODUCTPage">
        <ProductIMGS />
        <ProductDetails />
      </div>
      <ProductDetailsExtra />
    </div>
  );
}
