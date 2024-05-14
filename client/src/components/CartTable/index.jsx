import React, { useState, useEffect } from "react";
import "./style.css";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import {
  updateCart,
  deleteCart,
  getCartItemsDetails,
} from "../../Redux/CartSlice";
import { getDownloadURL, ref, listAll } from "firebase/storage";
import { storage } from "../../firebase";
import Loading from "../Loading";

export default function CartTable() {
  const cart = useSelector((state) => state.Cart.cartItems);
  const products = useSelector((state) => state.Products.data);
  const [value, setValue] = useState(1);
  const [specificProducts, setSpecificProducts] = useState([]);
  const [disable, setDisable] = useState(true);
  const dispatch = useDispatch();
  const decreaseQuantity = (id) => {
    setSpecificProducts((prevProducts) => {
      const updatedProducts = prevProducts.map((product) =>
        product.id === id
          ? { ...product, qty: product.qty - 1 < 1 ? 1 : product.qty - 1 }
          : product
      );
      dispatch(
        updateCart({
          id: id,
          qty: updatedProducts.find((product) => product.id === id).qty,
        })
      );
      return updatedProducts;
    });
  };

  const increaseQuantity = (id) => {
    setSpecificProducts((prevProducts) => {
      const updatedProducts = prevProducts.map((product) =>
        product.id === id ? { ...product, qty: product.qty + 1 } : product
      );
      dispatch(
        updateCart({
          id: id,
          qty: updatedProducts.find((product) => product.id === id).qty,
        })
      );
      return updatedProducts;
    });
  };

  useEffect(() => {
    if (cart && products) {
      const filteredProducts = cart.map((cartItem) => {
        const product = products.find((p) => p.id === cartItem.id);
        return { ...product, qty: cartItem.qty };
      });
      setSpecificProducts(filteredProducts);
      dispatch(getCartItemsDetails(filteredProducts));
    }
  }, [cart, products, dispatch]);

  const changeHandler = (id, newValue) => {
    const updatedProducts = specificProducts.map((product) =>
      product.id === id ? { ...product, qty: newValue } : product
    );
    setSpecificProducts(updatedProducts);
    dispatch(updateCart({ id, qty: newValue }));
    dispatch(getCartItemsDetails(specificProducts));
  };

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
  //   setImgLoading(true);
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
  if (!products) {
    return <Loading />;
  }
  return (
    <>
      <div className="cart-table-container">
        <table className="cart-table">
          <thead className="cart-table-head">
            <tr className="cart-table-tr">
              <th className="cart-table-th">Product</th>
              <th className="cart-table-th">Price</th>
              <th className="cart-table-th">Quantity</th>
              <th className="cart-table-th">Subtotal</th>
            </tr>
          </thead>
          <tbody className="cart-table-body">
            {specificProducts.map((product) => (
              <tr key={product.id}>
                <td className="cart-table-td">
                  <div className="cart-table-product-img">
                    <img
                      src={product.images[0]}
                      className="cart-table-img"
                      alt={product.title}
                    />

                    <div className="cart-product-name">
                      {product.title}
                      <div className="product-action-btns">
                        <button
                          onClick={() => {
                            setDisable((prevValue) => !prevValue);
                          }}
                          className="product-action-edit"
                        >
                          <MdOutlineEdit />
                        </button>
                        <button
                          onClick={() => {
                            dispatch(deleteCart(product.id));
                          }}
                          className="product-action-delete"
                        >
                          <RiDeleteBin6Line />
                        </button>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="cart-table-td">${product.price}</td>
                <td className="cart-table-td">
                  <div className="cart-qty-btn">
                    <div className="product-quantity">
                      <button
                        disabled={disable}
                        className="dec"
                        onClick={() => {
                          decreaseQuantity(product.id);
                        }}
                      >
                        -
                      </button>
                      <input
                        value={product.qty}
                        type="number"
                        readOnly
                        onChange={(e) => {
                          const newValue = parseInt(e.target.value);
                          setValue(newValue);
                          changeHandler(product.id, newValue);
                        }}
                      />
                      <button
                        disabled={disable}
                        className="inc"
                        onClick={() => {
                          increaseQuantity(product.id);
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </td>
                <td className="cart-table-td">
                  ${product.price * product.qty}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
