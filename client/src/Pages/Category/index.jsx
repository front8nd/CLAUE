import React, { useEffect, useState } from "react";
import "./style.css";
import CategoryProducts from "../../Layouts/CategoryProducts";
import CategorySidebar from "../../Layouts/CategorySidebar";
import CategoryPagination from "../../components/CategoryPagination";
import { useSelector, useDispatch } from "react-redux";
import { getProductsFirebase } from "../../Redux/ProductsSlice";
import Loading from "../../components/Loading";
import BacktoTop from "../../components/BacktoTop";
import Header from "../../Layouts/Header";
import Footer from "../../Layouts/Footer";

export default function Category() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.Products.data);
  const [loading, setLoading] = useState(false);

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
        <div className="cat-container">
          <CategoryPagination />
          <div className="CategoryPage">
            <div className="sidebar-hide-mobile">
              <CategorySidebar />
            </div>
            <CategoryProducts />
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
