import React from "react";
import "./style.css";
export default function MiscFilters() {
  return (
    <div className="miscfilter-container">
      <div className="CompareProducts">
        <p className="msic-title">Compare Products</p>
        <p className="msic-desc">You have no items to compare.</p>
      </div>
      <div className="MyWishList">
        <p className="msic-title">My Wish List</p>
        <p className="msic-desc">You have no items in your wish list.</p>
      </div>
    </div>
  );
}
