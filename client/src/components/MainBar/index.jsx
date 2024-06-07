import React, { useEffect, useState } from "react";
import "./style.css";
import logo from "/src/assets/logo_claue.png";
import { CiSearch } from "react-icons/ci";
import { VscAccount } from "react-icons/vsc";
import { GoHeart } from "react-icons/go";
import { CgShoppingBag } from "react-icons/cg";
import { CgMenuLeft } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SearchBar from "../SearchBar";
import { setShowSearch, setShowMobileMenu } from "../../Redux/ProductsSlice";
import { IoIosLogOut } from "react-icons/io";
import { fetchLoggedInUserDetails, userLoggedIn } from "../../Redux/UserSlice";
import IMGLoader from "../IMGLoader";
import { auth } from "../../firebase";

export default function MainBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userState = useSelector((state) => state.User.users);
  const userDetails = useSelector((state) => state.User.userDetail);
  const categoryList = useSelector((state) => state.Products.arrayCategory);
  const showSearch = useSelector((state) => state.Products.showSearch);
  const cart = useSelector((state) => state.Cart.cartItems);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        await dispatch(fetchLoggedInUserDetails());
        dispatch(userLoggedIn(true));
      } else {
        dispatch(userLoggedIn(false));
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  const logoutUser = async () => {
    try {
      await auth.signOut();
      dispatch(userLoggedIn(false));
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="MainBar">
      <div className="Mobile-Menu">
        <button className="mobile-toggler">
          <CgMenuLeft
            onClick={() => {
              dispatch(setShowMobileMenu(true));
            }}
            className="mobile-toggler-icon"
          />
        </button>
      </div>
      <div className="logo">
        <Link to={"/"}>
          <img
            className="logo-icon"
            src={logo}
            alt="claue"
            width="96px"
            height="27px"
          />
        </Link>
      </div>
      <div className="desktop-menu">
        <ul className="menu-list">
          <li className="menu-list-item">
            <Link to={"/"}>Home</Link>
          </li>
          <li className="menu-list-item">
            <Link to={"/shop"}>Shop</Link>
          </li>
          <li>
            <div className="dropdown-category menu-list-item">
              <a href="#">Categories</a>
              <div className="dropdown-menu">
                <ul>
                  {categoryList.map((e) => (
                    <React.Fragment key={e.id}>
                      <Link to={`/category/${e.category}`}>
                        <li className="dropdown-list">
                          {e.category.toUpperCase()}
                        </li>
                      </Link>
                    </React.Fragment>
                  ))}
                </ul>
              </div>
            </div>
          </li>
          <li className="menu-list-item">
            <a href="#">Pages</a>
          </li>
          <li className="menu-list-item">
            <a href="#">Elements</a>
          </li>
          <li className="menu-list-item">
            <a href="#">Accessories</a>
          </li>
          <li className="menu-list-item">
            <a href="#">
              <span className="red">Buy Now</span>
            </a>
          </li>
        </ul>
      </div>
      <div className="icon-menu">
        {showSearch && <SearchBar />}
        <button
          onClick={() => {
            dispatch(setShowSearch(true));
          }}
          className="icon-menu-item"
        >
          <CiSearch />
        </button>
        {userState === false ? (
          <Link to={"/login/"}>
            <button className="icon-menu-item hideMobile">
              <VscAccount />
            </button>
          </Link>
        ) : (
          <Link to={userDetails.role === "admin" ? "/Admin/" : "/Profile/"}>
            <button className="icon-menu-item hideMobile">
              <VscAccount />
            </button>
          </Link>
        )}
        <button className="icon-menu-item hideMobile">
          <GoHeart />
        </button>
        <Link to={"/cart/"}>
          <button className="icon-menu-item">
            <div className="shopping-notification">{cart.length}</div>
            <CgShoppingBag />
          </button>
        </Link>
        {userState && (
          <button onClick={logoutUser} className="icon-menu-item">
            <IoIosLogOut />
          </button>
        )}
      </div>
    </div>
  );
}
