import React, { useState, useEffect } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa";
import { BsTextParagraph } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import NoProductsFound from "../../components/NoProductsFound";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../components/Loading";
import { storage } from "../../firebase";
import { getDownloadURL, ref, listAll } from "firebase/storage";
import IMGLoader from "../../components/IMGLoader";
import { addtoCart, showModal } from "../../Redux/CartSlice";
import Modal from "../../components/Modal";
export default function ShopCard() {
  const [updatedProducts, setUpdatedProducts] = useState([]);
  const products = useSelector((state) => state.Products.data);
  const filteredPrice = useSelector((state) => state.Products.filteredPrice);
  const filteredColor = useSelector((state) => state.Products.filteredColor);
  const filteredSize = useSelector((state) => state.Products.filteredSize);
  const sortValue = useSelector((state) => state.Products.sortValue);
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.Cart.modal);

  useEffect(() => {
    // Filter products based on category name
    let filteredProducts = products;

    // Filter products based on selected price
    if (filteredProducts.length > 0) {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.price >= filteredPrice.minPrice &&
          product.price <= filteredPrice.maxPrice
      );
    }

    // Filter products based on selected colors
    if (filteredColor.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        filteredColor.includes(product.color)
      );
    }

    // // Filter products based on selected sizes
    if (filteredSize.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        filteredSize.includes(product.size)
      );
    }

    // Sort products based on sort type and order
    if (sortValue.type === "name") {
      filteredProducts.sort((a, b) => {
        if (sortValue.order === "ASC") {
          return a.title.localeCompare(b.title);
        } else {
          return b.title.localeCompare(a.title);
        }
      });
    } else if (sortValue.type === "date") {
      filteredProducts.sort((a, b) => {
        if (sortValue.order === "ASC") {
          return new Date(a.date) - new Date(b.date);
        } else {
          return new Date(b.date) - new Date(a.date);
        }
      });
    } else if (sortValue.type === "price") {
      filteredProducts.sort((a, b) => {
        if (sortValue.order === "ASC") {
          return a.price - b.price;
        } else {
          return b.price - a.price;
        }
      });
    }

    // Update state with filtered and sorted products
    setUpdatedProducts(filteredProducts);
  }, [filteredColor, filteredPrice, filteredSize, products, sortValue]);

  const customSize = {
    maxWidth: "180px",
    maxHeight: "350px",
    margin: "10px 15px",
  };
  const customBtnSize = {
    fontSize: "12px",
    padding: "10px 18px",
    bottom: "8%",
  };

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

  // useEffect(() => {
  //   if (products && products.length > 0) {
  //     fetchImageURLs();
  //   }
  // }, [products]);

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

  useEffect(() => {
    let timeout;
    if (modal) {
      timeout = setTimeout(() => {
        dispatch(showModal(false));
      }, 3000);
    }

    return () => clearTimeout(timeout);
  }, [modal, dispatch]);

  if (!products) {
    return <Loading />;
  }
  return (
    <div className="category-card">
      {modal && <Modal />}
      {updatedProducts.length > 0 ? (
        updatedProducts.map((e) => (
          <div key={e.id} style={customSize} className="product-card">
            <div className="product-head">
              <div className="product-img-con">
                <div>
                  <img
                    src={e.images[0]}
                    className="customIMGSize"
                    alt={e.title}
                  />
                </div>
              </div>
              <button
                onClick={() => {
                  dispatch(addtoCart({ id: e.id, qty: 1 }));
                  dispatch(showModal(true));
                }}
                style={customBtnSize}
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
                <Link to={`/product/${e.id}`} className="product-link">
                  {e.title}
                </Link>
              </div>
              <div className="product-price">${e.price}</div>
              <div className="product-rating">
                {[...Array(parseInt(e.rating))].map((_, index) => (
                  <FaStar key={index} />
                ))}
              </div>
            </div>
          </div>
        ))
      ) : (
        <NoProductsFound />
      )}
    </div>
  );
}
