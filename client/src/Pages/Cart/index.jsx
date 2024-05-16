import React, { useEffect, useState } from "react";
import CartSection from "../../Layouts/CartSection";
import Loading from "../../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { getProductsFirebase } from "../../Redux/ProductsSlice";
import BacktoTop from "../../components/BacktoTop";
import Header from "../../Layouts/Header";
import Footer from "../../Layouts/Footer";

export default function Cart() {
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
    <div>
      <BacktoTop />
      <Header />
      <CartSection />
      <Footer />
    </div>
  );
}
