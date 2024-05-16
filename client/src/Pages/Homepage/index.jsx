import React, { useEffect, useState } from "react";
import Content from "./../../Layouts/Content/index.jsx";
import LatestFromBlog from "./../../Layouts/LatestFromBlog/index.jsx";
import FollowInstagram from "./../../Layouts/FollowInstagram/index.jsx";
import Slider from "../../components/Slider";
import { useSelector, useDispatch } from "react-redux";
import { getProductsFirebase } from "../../Redux/ProductsSlice";
import Loading from "../../components/Loading";
import Footer from "../../Layouts/Footer/index.jsx";
import Header from "../../Layouts/Header/index.jsx";
import BacktoTop from "../../components/BacktoTop/index.jsx";
export default function Homepage() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.Products.data);
  const [loading, setLoading] = useState(true);
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
      {loading ? (
        <Loading />
      ) : (
        <>
          <Slider />
          <Content />
          <LatestFromBlog />
          <FollowInstagram />
        </>
      )}
      <Footer />
    </>
  );
}
