import React, { useEffect, useState } from "react";
import "./style.css";
import { TbSortAscending, TbSortDescending } from "react-icons/tb";
import { AiOutlineMenuFold } from "react-icons/ai";
import SidebarFilter from "../SidebarFilter";
import { useDispatch, useSelector } from "react-redux";
import { sortProducts, switchSidebar } from "../../Redux/ProductsSlice";
import { useParams } from "react-router-dom";
export default function CategoryProductsFilter() {
  const url = useParams();
  const dispatch = useDispatch();
  const [index, setIndex] = useState(1);
  const [sortOrder, setSortOrder] = useState("ASC");
  const [dropdownData, setDropdownData] = useState("sort-name");
  const sidebar = useSelector((state) => state.Products.handleSidebar);
  useEffect(() => {
    changeHandler();
  }, [sortOrder, dropdownData, dispatch]);

  const changeHandler = () => {
    let sortType;
    switch (dropdownData) {
      case "sort-name":
        sortType = "name";
        break;
      case "sort-date":
        sortType = "date";
        break;
      case "sort-price":
        sortType = "price";
        break;
      default:
        sortType = "";
    }
    dispatch(sortProducts({ sortType, sortOrder }));
  };

  // Toggle sort order whenever either button is clicked
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "ASC" ? "DSC" : "ASC");
  };

  return (
    <div className="CategoryProductsFilter">
      <div
        onClick={() => {
          dispatch(switchSidebar(true));
        }}
        className="sidebar-show-mobile"
      >
        <AiOutlineMenuFold />
      </div>
      {sidebar && (
        <div className="sidebar-div">
          <SidebarFilter />
        </div>
      )}
      <div className="cat-filter-head">{url.categoryName.toUpperCase()}</div>
      <div className="filer-con">
        <div className="cat-filer-tab">
          <select
            name="sort-by"
            id="sort-by"
            onChange={(e) => setDropdownData(e.target.value)}
          >
            <option value="sort-name">Sort by: Name</option>
            <option value="sort-date">Sort by: Date</option>
            <option value="sort-price">Sort by: Price</option>
          </select>
        </div>
        <div className="cat-asc-dsc">
          <button
            className={index === 1 ? "show dsc-btn" : "hide"}
            onClick={() => {
              setIndex(2);
              toggleSortOrder(); // Toggle sort order
            }}
          >
            <span className="asc-btn-img">
              <TbSortAscending />
            </span>
          </button>
          <button
            className={index === 2 ? "show asc-btn" : "hide"}
            onClick={() => {
              setIndex(1);
              toggleSortOrder(); // Toggle sort order
            }}
          >
            <span className="dsc-btn-img">
              <TbSortDescending />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
