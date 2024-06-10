import React, { useEffect, useState } from "react";
import Footer from "../../Layouts/Footer";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../../components/Loading";
import { auth, db } from "../../../firebase";
import { fetchLoggedInUserDetails } from "../../../Redux/UserSlice";
import UserProfile from "../../Components/UserProfile";
import { SidebarToggler } from "../../ContextHooks/sidebarToggler";
import style from "./Profile.module.scss";
import Navbar from "../../Layouts/Navbar";
import Sidebar from "../../Layouts/Sidebar";
export default function Profile() {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.User.userDetail);
  const loading = useSelector((state) => state.User.loading);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(fetchLoggedInUserDetails());
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <div className="bgColor">
      <SidebarToggler>
        <div className={style.Profile}>
          <Navbar />
          <Sidebar />
          <UserProfile />
        </div>
        <Footer />
      </SidebarToggler>
    </div>
  );
}
