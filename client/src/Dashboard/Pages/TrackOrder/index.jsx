import React, { useEffect, useState } from "react";
import Navbar from "../../Layouts/Navbar";
import Sidebar from "../../Layouts/Sidebar";
import { SidebarToggler } from "../../ContextHooks/sidebarToggler";
import style from "./TrackOrder.module.scss";
import TrackOrderDetails from "../../Components/TrackOrderDetails";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoggedInUserDetails } from "../../../Redux/UserSlice";
import IMGLoader from "../../../components/IMGLoader";
export default function TrackOrder() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.Products.data);
  const userDetails = useSelector((state) => state.User.userDetail);
  const [loading, setLoading] = useState(null);

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
    <div className={style.TrackOrder}>
      <SidebarToggler>
        <Navbar />
        <Sidebar />
        <TrackOrderDetails />
      </SidebarToggler>
    </div>
  );
}
