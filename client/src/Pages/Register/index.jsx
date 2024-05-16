import React from "react";
import RegisterUser from "../../Layouts/RegisterUser";
import Footer from "../../Layouts/Footer";
import Header from "../../Layouts/Header";
import BacktoTop from "../../components/BacktoTop";

export default function Register() {
  return (
    <>
      <BacktoTop />
      <Header />
      <div>
        <RegisterUser />
      </div>
      <Footer />
    </>
  );
}
