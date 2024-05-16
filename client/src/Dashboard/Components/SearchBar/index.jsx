import React from "react";
import { CiSearch } from "react-icons/ci";
import style from "./SearchBar.module.scss";
export default function SearchBar() {
  return (
    <div className={style.SBsearch}>
      <input
        placeholder="Search here..."
        className={style.SBsearchInput}
      ></input>
      <CiSearch className={style.SBsearchInputIcon} />
    </div>
  );
}
