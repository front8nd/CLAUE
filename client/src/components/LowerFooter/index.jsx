import React from "react";
import "./style.css";
export default function LowerFooter() {
  return (
    <div className="LowerFooter">
      <div className="copyright">© 2023 Copyright By ArrowTheme.</div>
      <div className="footer-menu">
        <a href="#">Shop</a>
        <a href="#">About Us</a>
        <a href="#">Contact</a>
        <a href="#">Blog</a>

        {/* <ul>
          <li>
            <a href="#">Shop</a>
          </li>
          <li>
            <a href="#">About Us</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
          <li>
            <a href="#">Blog</a>
          </li>
        </ul> */}
      </div>
    </div>
  );
}
