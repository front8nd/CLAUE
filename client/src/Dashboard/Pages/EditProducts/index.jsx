import React, { useEffect, useState } from "react";
import Navbar from "../../Layouts/Navbar";
import Sidebar from "../../Layouts/Sidebar";
import { SidebarToggler } from "../../ContextHooks/sidebarToggler";
import style from "./EditProducts.module.scss";
import EditProductDetails from "../../Components/EditProductsDetails";

import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductsFirebase } from "../../../Redux/ProductsSlice";
import Loading from "../../../components/Loading";

export default function EditProducts() {
  const location = useLocation();
  const { product } = location.state;
  const dispatch = useDispatch();
  const products = useSelector((state) => state.Products.data);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    if (products.length === 0) {
      setLoading(true);
      dispatch(getProductsFirebase())
        .then(() => setLoading(false))
        .catch(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [dispatch, products.length]);
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
          <>
            <EditProductDetails product={product} />
          </>
        )}
      </SidebarToggler>
    </div>
  );
}
