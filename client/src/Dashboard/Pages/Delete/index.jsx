import React, { useEffect, useState } from "react";
import Footer from "../../Layouts/Footer";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../../components/Loading";
import { auth, db } from "../../../firebase";
import { fetchLoggedInUserDetails } from "../../../Redux/UserSlice";
import UserDelete from "../../Components/UserDelete";
import { SidebarToggler } from "../../ContextHooks/sidebarToggler";
import style from "./Delete.module.scss";
import Sidebar from "../../Layouts/Sidebar";
import Navbar from "../../Layouts/Navbar";

export default function Delete() {
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
        <div className={style.Delete}>
          <Navbar />
          <Sidebar />
          <UserDelete />
        </div>
        <Footer />
      </SidebarToggler>
    </div>
  );
}
