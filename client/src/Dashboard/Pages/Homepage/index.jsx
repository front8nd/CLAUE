import React, { useEffect, useState } from "react";
import Navbar from "../../Layouts/Navbar";
import Sidebar from "../../Layouts/Sidebar";
import { SidebarToggler } from "../../ContextHooks/sidebarToggler";
import DashboardContent from "../../Layouts/DashboardContent";
import style from "./DashboardHomepage.module.scss";
import Footer from "../../Layouts/Footer";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../components/Loading";
import { getProductsFirebase } from "../../../Redux/ProductsSlice";
export default function DashboardHomepage() {
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
  }, [products.length, dispatch]);
  return (
    <div className="bgColor">
      <SidebarToggler>
        <div className={style.DashboardHomepage}>
          <Navbar />
          <Sidebar />
          {loading ? (
            <div className={style.loading}>
              <Loading />
            </div>
          ) : (
            <>
              <DashboardContent />
            </>
          )}
        </div>
        <Footer />
      </SidebarToggler>
    </div>
  );
}
