import React, { useEffect, useState } from "react";
import "./style.css";
import { IoMdClose } from "react-icons/io";
import { setShowSearch } from "../../Redux/ProductsSlice";
import { Link } from "react-router-dom";
import { storage } from "../../firebase";
import { getDownloadURL, ref, listAll } from "firebase/storage";
import IMGLoader from "../IMGLoader";
import { useSelector, useDispatch } from "react-redux";

export default function SearchBar() {
  const products = useSelector((state) => state.Products.data);
  const [imgLoading, setImgLoading] = useState(false);
  const dispatch = useDispatch();
  const [updatedProducts, setUpdatedProducts] = useState([]);
  const [search, setSearch] = useState("");
  const changeHandler = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (search.trim() === "") {
      setUpdatedProducts([]);
      return;
    }
    let filteredProducts = products.filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    );
    setUpdatedProducts(filteredProducts);
  }, [search, products]);

  //const [imageURLs, setImageURLs] = useState({});
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
  return (
    <div className="SearchBar">
      <div className="search-container">
        <div className="close-search">
          <IoMdClose
            className="close-search-icon"
            onClick={() => {
              dispatch(setShowSearch(false));
            }}
          />
        </div>
        <input
          placeholder="Type your query and press enter"
          className="search-bar"
          onChange={changeHandler}
        ></input>
        <div className="container-center">
          <div className="display-search-results">
            {updatedProducts.length >= 1 ? (
              updatedProducts.map((e) => (
                <div className="search-ul">
                  <Link
                    onClick={() => {
                      dispatch(setShowSearch(false));
                    }}
                    to={`/product/${e.id}`}
                    className="search-list"
                  >
                    {imgLoading ? (
                      <div className="search-img">
                        <IMGLoader />
                      </div>
                    ) : (
                      <img
                        src={e.images[0]}
                        className="search-img"
                        alt={e.title}
                      />
                    )}
                    <div className="search-title">{e.title} </div>
                  </Link>
                </div>
              ))
            ) : search.trim() === "" ? (
              <span>Enter any input</span>
            ) : (
              <span>No Products Found!</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
