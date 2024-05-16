import React, { useState, useEffect } from "react";
import Product from "./../../Layouts/Product/index.jsx";
import { useSelector, useDispatch } from "react-redux";
import { getProductsFirebase } from "../../Redux/ProductsSlice";
import Loading from "../../components/Loading";
import BacktoTop from "../../components/BacktoTop/index.jsx";
import Header from "../../Layouts/Header/index.jsx";
import Footer from "../../Layouts/Footer/index.jsx";

export default function ProductDetailsPage() {
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

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <BacktoTop />
      <Header />
      <Product />
      <Footer />
    </>
  );
}
