import React from "react";
import CartHeader from "../../components/CartHeader";
import CartTable from "../../components/CartTable";
import CartCheckout from "../../components/CartCheckout";
import NoProductsFound from "../../components/NoProductsFound";
import { useSelector } from "react-redux";

export default function CartSection() {
  const products = useSelector((state) => state.Cart.cartItems);
  return (
    <div>
      <CartHeader />
      {products.length > 0 ? (
        <>
          <CartTable />
          <CartCheckout />
        </>
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <NoProductsFound />
        </div>
      )}
    </div>
  );
}
