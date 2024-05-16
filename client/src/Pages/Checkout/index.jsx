import React from "react";
import CheckoutLayout from "../../Layouts/Checkout";
import BacktoTop from "../../components/BacktoTop";
import Header from "../../Layouts/Header";
import Footer from "../../Layouts/Footer";

export default function Checkout() {
  return (
    <div>
      <BacktoTop />
      <Header />
      <CheckoutLayout />
      <Footer />
    </div>
  );
}
