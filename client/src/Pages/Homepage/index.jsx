import React, { useEffect, useState } from "react";
import Content from "./../../Layouts/Content/index.jsx";
import LatestFromBlog from "./../../Layouts/LatestFromBlog/index.jsx";
import FollowInstagram from "./../../Layouts/FollowInstagram/index.jsx";
import Slider from "../../components/Slider";
import { useSelector, useDispatch } from "react-redux";
import { getProductsFirebase } from "../../Redux/ProductsSlice";
import Loading from "../../components/Loading";
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
  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <Slider />
      <Content />
      <LatestFromBlog />
      <FollowInstagram />
    </div>
  );
}
