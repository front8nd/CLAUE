import React from "react";
import ShopCard from "../../components/ShopCard";
import ShopFilter from "../../components/ShopFilter";
export default function ShopProducts() {
  return (
    <div className="cat-container">
      <ShopFilter />
      <ShopCard />
    </div>
  );
}
