import React, { useEffect, useState } from "react";
import "./style.css";
import { FaStar } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa";
import { BsTextParagraph } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import NoProductsFound from "../NoProductsFound";
import { storage } from "../../firebase";
import { getDownloadURL, ref, listAll } from "firebase/storage";
import Loading from "../Loading";
import IMGLoader from "../IMGLoader";
import { addtoCart, showModal } from "../../Redux/CartSlice";
import Modal from "../Modal";

export default function ProductCard() {
  const products = useSelector((state) => state.Products.data);
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.Cart.modal);

  setInterval(() => {
    if (modal === true) dispatch(showModal(false));
  }, [3000]);

  // const [imageURLs, setImageURLs] = useState({});
  // const fetchImageURLs = async () => {
  //   setImgLoading(true);
  //   const urls = {};
  //   for (const product of products) {
  //     try {
  //       const imageURL = await getFirstImageURL(product.imagesID);
  //       urls[product.imagesID] = imageURL;
  //     } catch (error) {
  //       console.error("Error fetching image URL:", error);
  //     }
  //   }
  //   setImageURLs(urls);
  //   setImgLoading(false);
  // };
  // const getFirstImageURL = async (productId) => {
  //   try {
  //     const imageRef = ref(storage, `images/${productId}`);
  //     const imageList = await listAll(imageRef);
  //     const firstImageRef = imageList.items[0];
  //     const imageURL = await getDownloadURL(firstImageRef);
  //     return imageURL;
  //   } catch (error) {
  //     console.error("Error fetching first image URL:", error);
  //     throw error;
  //   }
  // };
  // useEffect(() => {
  //   if (products && products.length > 0) {
  //     fetchImageURLs();
  //   }
  // }, [products]);

  return products.map((product) => (
    <div key={product.id} className="product-card">
      {modal && <Modal />}
      <div className="product-head">
        <div className="product-img-con">
          <img
            src={product.images[0]}
            className="Product_IMG"
            alt={product.title}
          />
        </div>
        <button
          onClick={() => {
            dispatch(addtoCart({ id: product.id, qty: 1 }));
            dispatch(showModal(true));
          }}
          className="product-cart-btn"
        >
          Add to Cart
        </button>
        <div className="product-btns">
          <button className="product-search-btn">
            <CiSearch />
          </button>
          <button className="product-fav-btn">
            <FaRegHeart />
          </button>
          <button className="product-compare-btn">
            <BsTextParagraph />
          </button>
        </div>
      </div>
      <div className="product-body">
        <div className="product-title">
          <Link to={`/product/${product.id}`} className="product-link">
            {product.title}
          </Link>
        </div>
        <div className="product-price">${product.price}</div>
        <div className="product-rating">
          {[...Array(parseInt(product.rating))].map((_, index) => (
            <FaStar key={index} />
          ))}
        </div>
      </div>
    </div>
  ));
}
