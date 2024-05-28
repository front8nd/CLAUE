import React, { useState, useEffect } from "react";
import Navbar from "../../Layouts/Navbar";
import Sidebar from "../../Layouts/Sidebar";
import { SidebarToggler } from "../../ContextHooks/sidebarToggler";
import style from "./AddProducts.module.scss";
import AddProductDetails from "../../Components/AddProductDetails";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../components/Loading";
import { getProductsFirebase } from "../../../Redux/ProductsSlice";

export default function AddProducts() {
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
    <div className={style.AddProducts}>
      <SidebarToggler>
        <Navbar />
        <Sidebar />
        {loading ? (
          <div className={style.loading}>
            <Loading />
          </div>
        ) : (
          <>
            <AddProductDetails />
          </>
        )}
      </SidebarToggler>
    </div>
  );
}
