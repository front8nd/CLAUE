import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
import PostsTable from "../../components/PostsTable";
import ManageCategories from "../../components/ManageCategories";
import ManageColors from "../../components/ManageColors";

export default function DashboardLayout() {
  return (
    <div className="dashboard-container">
      <div className="box">
        <div className="sub-box-1">
          <span className="sub-box-heading">Manage Posts</span>
          <Link to={"/publish/"}>
            <button className="box-btn">Create New</button>
          </Link>
        </div>
        <div className="sub-box">
          <PostsTable />
        </div>
      </div>
      <div className="box">
        <div className="sub-box-2">
          <span className="sub-box-heading">Manage Categories</span>
          <ManageCategories />
        </div>
        <div className="sub-box-2">
          <span className="sub-box-heading">Manage Colors</span>
          <ManageColors />
        </div>
      </div>
    </div>
  );
}
