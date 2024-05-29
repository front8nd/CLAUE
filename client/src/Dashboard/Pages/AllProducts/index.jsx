import React, { useEffect, useState } from "react";
import Navbar from "../../Layouts/Navbar";
import Sidebar from "../../Layouts/Sidebar";
import { SidebarToggler } from "../../ContextHooks/sidebarToggler";
import style from "./AllProducts.module.scss";
import AllProductsDetails from "../../Components/AllProductsDetails";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../components/Loading";
import { getProductsFirebase } from "../../../Redux/ProductsSlice";
export default function AllProducts() {
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
    <div className={style.AllProducts}>
      <SidebarToggler>
        <Navbar />
        <Sidebar />
        {loading ? (
          <div className={style.loading}>
            <Loading />
          </div>
        ) : (
          <>
            <AllProductsDetails />
          </>
        )}
      </SidebarToggler>
    </div>
  );
}
