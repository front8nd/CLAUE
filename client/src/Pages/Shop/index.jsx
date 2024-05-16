import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductsFirebase } from "../../Redux/ProductsSlice";
import Loading from "../../components/Loading";
import CategorySidebar from "../../Layouts/CategorySidebar";
import ShopProducts from "../../Layouts/ShopProducts";
import ShopPagination from "../../components/ShopPagination";
import CategoryPagination from "../../components/CategoryPagination";
import Footer from "../../Layouts/Footer";
import Header from "../../Layouts/Header";
import BacktoTop from "../../components/BacktoTop";

export default function ShopLayout() {
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
        <div className="cat-container">
          <ShopPagination />
          <div className="CategoryPage">
            <div className="sidebar-hide-mobile">
              <CategorySidebar />
            </div>
            <ShopProducts />
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
