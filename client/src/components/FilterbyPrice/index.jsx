// Import useState
import React, { useState, useEffect } from "react";
import "./style.css";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Slider } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setPriceRange } from "../../Redux/ProductsSlice";
import { useParams } from "react-router-dom";

export default function FilterbyPrice() {
  const [index, setIndex] = useState(1);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.Products.data);
  const { categoryName } = useParams();
  const [minPrice, setMinPrice] = useState(1);
  const [maxPrice, setMaxPrice] = useState(999999);
  console.log(minPrice, maxPrice);

  const handlePrice = () => {
    let filteredProducts = products;

    let min = Number.MAX_VALUE;
    let max = Number.MIN_VALUE;

    filteredProducts.forEach((product) => {
      // Convert price from string to number
      const price = parseFloat(product.price);

      if (price < min) {
        min = price;
      }
      if (price > max) {
        max = price;
      }
    });

    setMinPrice(min);
    setMaxPrice(max);

    dispatch(setPriceRange({ min: min, max: max }));
  };

  const changeHandler = (value) => {
    dispatch(setPriceRange({ min: value[0], max: value[1] }));
  };

  const showTab = (e) => {
    setIndex(e);
  };

  useEffect(() => {
    handlePrice();
  }, []);
  return (
    <div>
      {index === 1 ? (
        <div
          onClick={() => {
            showTab(2);
          }}
          className="filter-price-heading"
        >
          <p>Filter by Price</p>
          <span className="middle-icon">
            <IoIosArrowDown />
          </span>
        </div>
      ) : (
        <div
          onClick={() => {
            showTab(1);
          }}
          className="filter-price-heading"
        >
          <p>Filter by Price</p>
          <span className="middle-icon">
            <IoIosArrowUp />
          </span>
        </div>
      )}
      <div className={index === 1 ? "filter-price-slider show" : "hide"}>
        <div className="price-display">
          <p
            onClick={() => {
              dispatch(setPriceRange({ min: minPrice, max: maxPrice }));
            }}
            className="price-bg"
          >
            ${minPrice}
          </p>
          <p
            onClick={() => {
              dispatch(setPriceRange({ min: minPrice, max: maxPrice }));
            }}
            className="price-bg"
          >
            ${maxPrice}
          </p>
        </div>
        <Slider
          onChange={changeHandler}
          range
          min={minPrice}
          max={maxPrice}
          defaultValue={[minPrice, maxPrice]}
        />
      </div>
    </div>
  );
}
