import React, { useEffect, useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { IoIosCloseCircleOutline, IoIosLogOut } from "react-icons/io";
import { setShowMobileMenu } from "../../Redux/ProductsSlice";
import { IoIosArrowDown } from "react-icons/io";
import { VscAccount } from "react-icons/vsc";

export default function MobileMenu() {
  const userState = useSelector((state) => state.User.users);
  const categoryList = useSelector((state) => state.Products.arrayCategory);
  const showMobileMenu = useSelector((state) => state.Products.showMobileMenu);
  const dispatch = useDispatch();
  const [hide, setHide] = useState(false);
  const logoutUser = async () => {
    try {
      const res = await auth.signOut();
      dispatch(userLoggedIn(false));
      window.location.href = "/";
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {}, [dispatch]);

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
                  <span className="mm-withICON">
                    Categories
                    <IoIosArrowDown />
                  </span>
                </Link>
                {hide && (
                  <div className="dropdown-menu">
                    <ul>
                      {categoryList.map((e) => (
                        <React.Fragment key={e.id}>
                          <Link
                            className="hide-decoration"
                            to={`/category/${e.category}`}
                          >
                            <li className="dropdown-list">
                              {e.category.toUpperCase()}
                            </li>
                          </Link>
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
              {userState === false ? (
                <Link to={"/login/"}>
                  <button className="icon-menu-item hideMobile">
                    <VscAccount />
                  </button>
                </Link>
              ) : (
                <Link to={"/Admin/"}>
                  <button className="icon-menu-item hideMobile">
                    <VscAccount />
                  </button>
                </Link>
              )}
              {userState && (
                <button onClick={logoutUser} className="icon-menu-item">
                  <span className="mm-withICON ">
                    Logout
                    <IoIosLogOut />
                  </span>
                </button>
              )}
            </li>
          </ul>
        </div>
      </>
    )
  );
}
