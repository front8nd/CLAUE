import React, { useEffect, useState } from "react";
import Navbar from "../../Layouts/Navbar";
import Sidebar from "../../Layouts/Sidebar";
import { SidebarToggler } from "../../ContextHooks/sidebarToggler";
import style from "./EditProducts.module.scss";
import EditProductDetails from "../../Components/EditProductsDetails";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductsFirebase } from "../../../Redux/ProductsSlice";
import Loading from "../../../components/Loading";

export default function EditProducts() {
  const url = useParams();
  const productID = url.ProductID;
  const dispatch = useDispatch();
  const products = useSelector((state) => state.Products.data);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);
  console.log(productID);
  useEffect(() => {
    if (products.length === 0) {
      setLoading(true);
      dispatch(getProductsFirebase()).then(() => setLoading(false));
    }
  }, [dispatch, products.length]);

  useEffect(() => {
    if (productID && products.length > 0) {
      const foundProduct = products.find(
        (prod) => prod.id === productID || prod.id.toString() === productID
      );
      setProduct(foundProduct);
    }
  }, [productID, products]);

  return (
    <div className={style.EditProducts}>
      <SidebarToggler>
        <Navbar />
        <Sidebar />
        {loading ? (
          <div className={style.loading}>
            <Loading />
          </div>
        ) : (
          product && <EditProductDetails product={product} />
        )}
      </SidebarToggler>
    </div>
  );
}
