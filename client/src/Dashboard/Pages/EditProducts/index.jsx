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
import { fetchLoggedInUserDetails } from "../../../Redux/UserSlice";
import IMGLoader from "../../../components/IMGLoader";
export default function EditProducts() {
  const url = useParams();
  const productID = url.ProductID;
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.Products.data);
  const userDetails = useSelector((state) => state.User.userDetail);
  const [loading, setLoading] = useState(null);

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

  useEffect(() => {
    if (!userDetails || Object.keys(userDetails).length === 0) {
      dispatch(fetchLoggedInUserDetails());
    }
  }, [dispatch, userDetails]);

  if (loading) {
    return (
      <div className={style.loading}>
        <IMGLoader />
      </div>
    );
  }
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
