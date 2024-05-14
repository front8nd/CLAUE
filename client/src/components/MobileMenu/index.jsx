import React, { useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { setShowMobileMenu } from "../../Redux/ProductsSlice";
import { IoIosArrowDown } from "react-icons/io";

export default function MobileMenu() {
  const categoryList = useSelector((state) => state.Products.arrayCategory);
  const showMobileMenu = useSelector((state) => state.Products.showMobileMenu);
  const dispatch = useDispatch();
  const [hide, setHide] = useState(false);
  return (
    showMobileMenu && (
      <>
        <div className="MobileMenu-overlay"></div>
        <div className="MobileMenu">
          <span className="mobile-menu-close-bg"></span>
          <IoIosCloseCircleOutline
            onClick={() => {
              dispatch(setShowMobileMenu(false));
            }}
            className="mobile-menu-close"
          />
          <ul className="mobilemenu-list">
            <li className="mobilemenu-list-items ">
              <Link to={"/"} className="hide-decoration">
                Home
              </Link>
            </li>
            <li className="mobilemenu-list-items ">
              <Link to={"/shop"} className="hide-decoration">
                Shop
              </Link>
            </li>
            <li>
              <div className="dropdown-category mobilemenu-list-items ">
                <Link
                  onClick={() => {
                    setHide(!hide);
                  }}
                  href="#"
                  className="hide-decoration"
                >
                  <span className="cat-with-icon">
                    Categories
                    <IoIosArrowDown />
                  </span>
                </Link>
                {hide && (
                  <div className="dropdown-menu">
                    <ul>
                      {categoryList.map((e) => (
                        <React.Fragment key={e.id}>
                          <li className="dropdown-list">
                            <Link
                              className="hide-decoration"
                              to={`/category/${e.category}`}
                            >
                              {e.category.toUpperCase()}
                            </Link>
                          </li>
                        </React.Fragment>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </li>
            <li className="mobilemenu-list-items ">
              <Link className="hide-decoration" href="#">
                Pages
              </Link>
            </li>
            <li className="mobilemenu-list-items ">
              <Link className="hide-decoration" href="#">
                Elements
              </Link>
            </li>
            <li className="mobilemenu-list-items ">
              <Link className="hide-decoration" href="#">
                Accessories
              </Link>
            </li>
            <li className="mobilemenu-list-items ">
              <Link className="red " href="#">
                Buy Now
              </Link>
            </li>
          </ul>
        </div>
      </>
    )
  );
}
