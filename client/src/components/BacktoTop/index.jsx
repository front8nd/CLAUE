import React from "react";
import { IoIosArrowUp } from "react-icons/io";
import "./style.css";
export default function BacktoTop() {
  const backtoTopBTN = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div onClick={backtoTopBTN} className="backtoTop">
      <div style={{ verticalAlign: "middle" }}>
        <IoIosArrowUp />
      </div>
    </div>
  );
}
