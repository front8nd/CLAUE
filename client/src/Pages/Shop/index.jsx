import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductsFirebase } from "../../Redux/ProductsSlice";
import Loading from "../../components/Loading";
import CategorySidebar from "../../Layouts/CategorySidebar";
import ShopProducts from "../../Layouts/ShopProducts";
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
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="cat-container">
      <div className="CategoryPage">
        <div className="sidebar-hide-mobile">
          <CategorySidebar />
        </div>
        <ShopProducts />
      </div>
    </div>
  );
}
