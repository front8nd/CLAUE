import React, { useEffect, useState } from "react";
import DashboardLayout from "../../Layouts/DashboardLayout";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import { getProductsFirebase } from "../../Redux/ProductsSlice";
import Loading from "../../components/Loading";
import DashboardHeader from "../../components/DashboardHeader";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import BacktoTop from "../../components/BacktoTop";
import Header from "../../Layouts/Header";
import Footer from "../../Layouts/Footer";

export default function Dashboard() {
  const userState = useSelector((state) => state.User.users);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const products = useSelector((state) => state.Products.data);

  const getUserDetails = async () => {
    if (!authChecked) {
      setLoading(true);
      try {
        auth.onAuthStateChanged(async (user) => {
          if (user) {
            const docRef = doc(db, "Users", user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              setUserDetails(docSnap.data());
            }
          } else {
            setUserDetails(null);
          }
          setLoading(false);
          setAuthChecked(true);
        });
      } catch (error) {
        console.error("Error fetching user details:", error);
        setLoading(false);
        setAuthChecked(true);
      }
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

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
    <>
      <BacktoTop />
      <Header />
      {!authChecked || loading ? (
        <Loading />
      ) : (
        <div>
          <div className="dashboard-head">
            <DashboardHeader userDetails={userDetails} />
          </div>
          <div className="dashboard">
            <DashboardLayout />
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
