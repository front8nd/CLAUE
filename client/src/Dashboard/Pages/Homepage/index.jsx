import React, { useEffect, useState } from "react";
import Navbar from "../../Layouts/Navbar";
import Sidebar from "../../Layouts/Sidebar";
import { SidebarToggler } from "../../ContextHooks/sidebarToggler";
import DashboardContent from "../../Layouts/DashboardContent";
import style from "./DashboardHomepage.module.scss";
import Footer from "../../Layouts/Footer";
import Loading from "../../../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoggedInUserDetails } from "../../../Redux/UserSlice";
import IMGLoader from "../../../components/IMGLoader";
import { getProductsFirebase } from "../../../Redux/ProductsSlice";
export default function DashboardHomepage() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.Products.data);
  const userDetails = useSelector((state) => state.User.userDetail);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    if (products.length === 0) {
      setLoading(true);
      dispatch(getProductsFirebase()).then(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [products.length, dispatch]);

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
