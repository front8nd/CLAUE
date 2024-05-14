import React from "react";
import CategoryCard from "../../components/CategoryCard";
import "./style.css";
import CategoryProductsFilter from "../../components/CategoryProductsFilter";

export default function CategoryProducts() {
  return (
    <div className="cat-container">
      <CategoryProductsFilter />
      <CategoryCard />
    </div>
  );
}
