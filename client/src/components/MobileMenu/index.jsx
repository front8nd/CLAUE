import React, { useEffect, useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { IoIosCloseCircleOutline, IoIosLogOut } from "react-icons/io";
import { setShowMobileMenu } from "../../Redux/ProductsSlice";
import { IoIosArrowDown } from "react-icons/io";
import { VscAccount } from "react-icons/vsc";
import { auth } from "../../firebase";
import { userLoggedIn } from "../../Redux/UserSlice";
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
              <Link
                to={"/"}
                className="hide-decoration"
                onClick={() => {
                  dispatch(setShowMobileMenu(false));
                }}
              >
                Home
              </Link>
            </li>
            <li className="mobilemenu-list-items ">
              <Link
                to={"/shop"}
                className="hide-decoration"
                onClick={() => {
                  dispatch(setShowMobileMenu(false));
                }}
              >
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
                            <li
                              className="dropdown-list"
                              onClick={() => {
                                dispatch(setShowMobileMenu(false));
                              }}
                            >
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
              <Link
                className="hide-decoration"
                href="#"
                onClick={() => {
                  dispatch(setShowMobileMenu(false));
                }}
              >
                Pages
              </Link>
            </li>
            <li className="mobilemenu-list-items ">
              <Link
                className="hide-decoration"
                href="#"
                onClick={() => {
                  dispatch(setShowMobileMenu(false));
                }}
              >
                Elements
              </Link>
            </li>
            <li className="mobilemenu-list-items ">
              <Link
                className="hide-decoration"
                href="#"
                onClick={() => {
                  dispatch(setShowMobileMenu(false));
                }}
              >
                Accessories
              </Link>
            </li>
            {userState === false ? (
              <li className="mobilemenu-list-items ">
                <Link to={"/login/"}>
                  <button className="icon-menu-item">
                    <span
                      className="mm-withICON "
                      onClick={() => {
                        dispatch(setShowMobileMenu(false));
                      }}
                    >
                      Login <VscAccount />
                    </span>
                  </button>
                </Link>
              </li>
            ) : (
              <li className="mobilemenu-list-items ">
                <Link
                  to={"/Admin/"}
                  onClick={() => {
                    dispatch(setShowMobileMenu(false));
                  }}
                >
                  <button className="icon-menu-item">
                    <span className="mm-withICON ">
                      Dashboard <VscAccount />
                    </span>
                  </button>
                </Link>
              </li>
            )}
            {userState && (
              <li className="mobilemenu-list-items ">
                <button onClick={logoutUser} className="icon-menu-item">
                  <span
                    className="mm-withICON "
                    onClick={() => {
                      dispatch(setShowMobileMenu(false));
                    }}
                  >
                    Logout
                    <IoIosLogOut />
                  </span>
                </button>
              </li>
            )}
          </ul>
        </div>
      </>
    )
  );
}
