import React from "react";
import FilterbyPrice from "../../components/FilterbyPrice";
import "./style.css";
import FilterbyColor from "../../components/FilterbyColor";
import FilterbySize from "../../components/FilterbySize";
import MiscFilters from "../../components/MiscFilters";
export default function ShopSidebar() {
  return (
    <div className="cat-sidebar">
      <FilterbyPrice />
      <FilterbyColor />
      <FilterbySize />
      <MiscFilters />
    </div>
  );
}
