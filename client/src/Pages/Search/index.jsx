import React, { useEffect } from "react";
import SearchCard from "../../components/SearchCard";
import CategorySidebar from "../../Layouts/CategorySidebar";
import CategoryPagination from "../../components/CategoryPagination";
import { useSelector, useDispatch } from "react-redux";
import { getProductsFirebase } from "../../Redux/ProductsSlice";
import Loading from "../../components/Loading";
import Footer from "../../Layouts/Footer";
import BacktoTop from "../../components/BacktoTop";
import Header from "../../Layouts/Header";
export default function Search() {
  const loading = useSelector((state) => state.Products.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsFirebase());
  }, [dispatch]);
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
            <SearchCard />
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
