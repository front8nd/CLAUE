import React, { useState } from "react";
import "./style.css";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { useDispatch } from "react-redux";
import { setSize } from "../../Redux/ProductsSlice";
export default function FilterbySize() {
  const dispatch = useDispatch();
  const [index, setIndex] = useState(1);
  const showTab = (e) => {
    setIndex(e);
  };
  return (
    <div className="filter-size-container">
      {index === 1 ? (
        <div
          onClick={() => {
            showTab(2);
          }}
          className="filter-size-heading"
        >
          <p>Filter by Size</p>
          <span className="middle-icon">
            <IoIosArrowDown />
          </span>
        </div>
      ) : (
        <div
          onClick={() => {
            showTab(1);
          }}
          className="filter-size-heading"
        >
          <p>Filter by Size</p>
          <span className="middle-icon">
            <IoIosArrowUp />
          </span>
        </div>
      )}
      <div className={index === 1 ? "filter-size-slider show" : "hide"}>
        <div className="product-size">
          <button
            onClick={() => dispatch(setSize("S"))}
            className="product-size-btn"
          >
            S
          </button>
          <button
            onClick={() => dispatch(setSize("M"))}
            className="product-size-btn"
          >
            M
          </button>
          <button
            onClick={() => dispatch(setSize("L"))}
            className="product-size-btn"
          >
            L
          </button>
          <button
            onClick={() => dispatch(setSize("XL"))}
            className="product-size-btn"
          >
            XL
          </button>
          <button
            onClick={() => dispatch(setSize(""))}
            className="clear-size product-size-btn"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
