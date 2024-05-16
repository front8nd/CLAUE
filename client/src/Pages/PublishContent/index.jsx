import React from "react";
import "./style.css";
import PublishContentInput from "../../components/PublishContent-Input";
import PublishHeader from "../../components/PublishHeader";
import Footer from "../../Layouts/Footer";
import Header from "../../Layouts/Header";
import BacktoTop from "../../components/BacktoTop";

export default function PublishContent() {
  return (
    <>
      <BacktoTop />
      <Header />
      <div>
        <PublishHeader />
        <div className="center">
          <div className="publish-content">
            <PublishContentInput />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
