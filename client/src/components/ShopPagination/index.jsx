import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ProductPagination() {
  return (
    <div className="cat-pagination-container">
      <div className="CategoryPagination">
        <div className="home-p">
          <Link to={"/"}>Home {">"}</Link>
        </div>
        <div className="title-p"> Shop</div>
      </div>
    </div>
  );
}
