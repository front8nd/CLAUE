import React from "react";
import NewLook from "/src/assets/newlook.jpg";
import Summer from "/src/assets/summer-sale.jpg";

import "./style.css";
export default function Deals() {
  return (
    <div className="deals-sections">
      <div className="lookbook">
        <div className="img-con1">
          {" "}
          <img src={NewLook} className="lookbook-img" />
        </div>
        <span className="lookbook-text">
          <h3 className="lookbook-text-h">LOOKBOOK 2023</h3>
          <p className="lookbook-text-p">MAKE LOVE THIS LOOK</p>
        </span>
      </div>
      <div className="summer">
        <div className="img-con1">
          <img src={Summer} className="summer-img" />
        </div>
        <span className="summer-text">
          <h3 className="summer-text-h">SUMMER SALE </h3>
          <p className="summer-text-p">UP TO 70%</p>
        </span>
      </div>
    </div>
  );
}
