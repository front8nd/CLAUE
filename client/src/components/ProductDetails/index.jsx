import React, { useEffect, useState } from "react";
import "./style.css";
import { FaRegHeart } from "react-icons/fa";
import { BsTextParagraph } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addtoCart, showModal } from "../../Redux/CartSlice";
import Loading from "../Loading";
import Modal from "../Modal";

export default function ProductDetails() {
  const url = useParams();
  const extractedURL = url.productID;
  const [value, setValue] = useState(1);
  const [product, setSpecificProduct] = useState(null);
  const products = useSelector((state) => state.Products.data);
  const modal = useSelector((state) => state.Cart.modal);
  const dispatch = useDispatch();

  const decreaseQuantity = () => {
    setValue((prevValue) => (prevValue <= 1 ? 1 : prevValue - 1));
  };

  const increaseQuantity = () => {
    setValue((prevValue) => prevValue + 1);
  };

  const submitHandler = (id) => {
    dispatch(addtoCart({ id, qty: value }));
    dispatch(showModal(true));
  };

  const findProduct = () => {
    if (extractedURL && products) {
      const foundProduct = products.find(
        (prod) =>
          prod.id === extractedURL || prod.id.toString() === extractedURL
      );
      setSpecificProduct(foundProduct);
    }
  };

  useEffect(() => {
    findProduct();
  }, [products]);

  if (!product) {
    return <Loading />;
  }

  return (
    <div className="ProductDetails">
      {modal && <Modal />}
      <div className="ProductDetails-container">
        <h1 className="product-page-title">{product.title}</h1>
        <p className="product-review">Be the first to review this product</p>
        <h4 className="product-p-price">${product.price}</h4>
        <p className="product-description">{product.description}</p>
        <div className="product-size-details">
          <h5 className="size">SIZE:</h5>
          <div className="product-size">
            <button className="product-size-btn">{product.size}</button>
          </div>
        </div>
        <h5 style={{ margin: "10px 0" }} className="size">
          Color:
        </h5>
        <div className="color-display">
          <span className={`${product.color}-dot dot`}></span>
        </div>
        <div className="product-misc">
          <div className="product-quantity">
            <button className="dec" onClick={decreaseQuantity}>
              -
            </button>
            <input
              value={value}
              type="number"
              disabled
              onChange={(e) => setValue(e.target.value)}
            ></input>
            <button className="inc" onClick={increaseQuantity}>
              +
            </button>
          </div>
          <button
            onClick={() => {
              submitHandler(product.id);
            }}
            className="product-cartbtn"
          >
            Add to Cart
          </button>
          <div className="productbtns">
            <button className="product-favbtn">
              <FaRegHeart />
            </button>
            <button className="product-comparebtn">
              <BsTextParagraph />
            </button>
          </div>
        </div>
        <div className="product-misc-details">
          <a href="#">Size Guide</a>
          <a href="#" style={{ margin: "0px 5px" }}>
            Delivery & Return
          </a>
          <div>
            <div style={{ fontWeight: "bold", margin: "10px 0" }}>
              Availability:
              <span style={{ color: "green" }}> In stock</span>
            </div>
          </div>
          <div style={{ fontWeight: "bold", margin: "10px 0" }}>
            SKU:
            <span style={{ fontWeight: "normal" }}> TRENDING_06</span>
          </div>
        </div>
      </div>
    </div>
  );
}
