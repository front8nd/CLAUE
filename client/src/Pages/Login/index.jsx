import React from "react";
import LoginUser from "../../Layouts/LoginUser";
import Footer from "../../Layouts/Footer";
import Header from "../../Layouts/Header";
import BacktoTop from "../../components/BacktoTop";

export default function Login() {
  return (
    <>
      <BacktoTop />
      <Header />
      <div>
        <LoginUser />
      </div>
      <Footer />
    </>
  );
}
