import React from "react";
import "./style.css";
import Footer from "../../Layouts/Footer";
import Header from "../../Layouts/Header";
import BacktoTop from "../../components/BacktoTop";
export default function NotFound404() {
  return (
    <>
      <BacktoTop />
      <Header />
      <div className="not-found">Page Doesn't Exists..</div>
      <Footer />
    </>
  );
}
