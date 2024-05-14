import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
export default function CategoryPagination() {
  return (
    <div className="cat-pagination-container">
      <div className="CategoryPagination">
        <div className="home-p">
          <Link to={"/"}>Home {">"}</Link>
        </div>
        <div className="title-p"> Category</div>
      </div>
    </div>
  );
}
