import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./style.css";
export default function ProductPagination() {
  const { productID } = useParams();
  const [product, setProduct] = useState(null);

  const products = useSelector((state) => state.Products.data);

  useEffect(() => {
    const filteredProduct = products.find(
      (prod) => prod.id === productID || prod.id.toString() === productID
    );
    setProduct(filteredProduct);
  }, [productID, products]);
  console.log(productID);
  return (
    <div className="ProductPagination">
      <div className="home-p">
        <Link to={"/"}>Home {" > "}</Link>
      </div>
      {product && <div className="title-p">{product.title}</div>}
    </div>
  );
}
