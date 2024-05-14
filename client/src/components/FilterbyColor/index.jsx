import React, { useState } from "react";
import "./style.css";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { useDispatch } from "react-redux";
import { setColor } from "../../Redux/ProductsSlice";
import { MdOutlineClear } from "react-icons/md";

export default function FilterbyColor() {
  const [index, setIndex] = useState(1);
  const disptach = useDispatch();
  const showTab = (e) => {
    setIndex(e);
  };
  return (
    <div className="filter-color-container">
      {index === 1 ? (
        <div
          onClick={() => {
            showTab(2);
          }}
          className="filter-color-heading"
        >
          <p>Filter by Color</p>
          <span className="middle-icon">
            <IoIosArrowDown />
          </span>
        </div>
      ) : (
        <div
          onClick={() => {
            showTab(1);
          }}
          className=" filter-color-heading"
        >
          <p>Filter by Color</p>
          <span className="middle-icon">
            <IoIosArrowUp />
          </span>
        </div>
      )}
      <div className={index === 1 ? "filter-color-slider show" : "hide"}>
        <div className="color-display">
          <span
            onClick={() => disptach(setColor("black"))}
            className="black-dot dot"
          ></span>
          <span
            onClick={() => disptach(setColor("grey"))}
            className="grey-dot dot"
          ></span>
          <span
            onClick={() => disptach(setColor("blue"))}
            className="blue-dot dot"
          ></span>
          <span
            onClick={() => disptach(setColor("brown"))}
            className="brown-dot dot"
          ></span>
          <span
            onClick={() => disptach(setColor("green"))}
            className="green-dot dot"
          ></span>
          <span
            onClick={() => disptach(setColor("khaki"))}
            className="khaki-dot dot"
          ></span>
          <span
            onClick={() => disptach(setColor("red"))}
            className="red-dot dot"
          ></span>
          <span onClick={() => disptach(setColor(""))} className="clear dot">
            <MdOutlineClear className="clear-icon" />
          </span>
        </div>
      </div>
    </div>
  );
}
