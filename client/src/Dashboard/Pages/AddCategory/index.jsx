import React, { useEffect, useState } from "react";
import Navbar from "../../Layouts/Navbar";
import Sidebar from "../../Layouts/Sidebar";
import { SidebarToggler } from "../../ContextHooks/sidebarToggler";
import style from "./AddCategory.module.scss";
import AddCategoryDetails from "../../Components/AddCategoryDetails";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../components/Loading";
import { getProductsFirebase } from "../../../Redux/ProductsSlice";
import { fetchLoggedInUserDetails } from "../../../Redux/UserSlice";
import IMGLoader from "../../../components/IMGLoader";
export default function AddCategory() {
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

  const userDetails = useSelector((state) => state.User.userDetail);

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
      <div className={style.AddCategory}>
        <SidebarToggler>
          <Navbar />
          <Sidebar />
          {loading ? (
            <div className={style.loading}>
              <Loading />
            </div>
          ) : (
            <AddCategoryDetails />
          )}
        </SidebarToggler>
      </div>
    </div>
  );
}
