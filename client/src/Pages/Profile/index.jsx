import React, { useEffect, useState } from "react";
import ProfileLayout from "../../Layouts/ProfileLayout";
import BacktoTop from "../../components/BacktoTop";
import Header from "../../Layouts/Header";
import Footer from "../../Layouts/Footer";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../components/Loading";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import ProfileHeader from "../../components/ProfileHeader";
import { fetchLoggedInUserDetails } from "../../Redux/UserSlice";
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
  console.log(userDetails);

  // const [loading, setLoading] = useState(true);
  // const [userDetails, setUserDetails] = useState(null);
  // const [authChecked, setAuthChecked] = useState(false);
  // const getUserDetails = async () => {
  //   if (!authChecked) {
  //     setLoading(true);
  //     try {
  //       auth.onAuthStateChanged(async (user) => {
  //         if (user) {
  //           const docRef = doc(db, "Users", user.uid);
  //           const docSnap = await getDoc(docRef);
  //           if (docSnap.exists()) {
  //             setUserDetails(docSnap.data());
  //           }
  //         } else {
  //           setUserDetails(null);
  //         }
  //         setLoading(false);
  //         setAuthChecked(true);
  //       });
  //     } catch (error) {
  //       console.error("Error fetching user details:", error);
  //       setLoading(false);
  //       setAuthChecked(true);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   getUserDetails();
  // }, []);

  return (
    <>
      <BacktoTop />
      <Header />
      {loading ? (
        <Loading />
      ) : (
        <div>
          <div className="dashboard-head">
            <ProfileHeader userDetails={userDetails} />
          </div>
          <div className="dashboard">
            <ProfileLayout userDetails={userDetails} />
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
