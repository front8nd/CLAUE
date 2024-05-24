import React from "react";
import { CiSearch } from "react-icons/ci";
import style from "./SearchBar.module.scss";
export default function SearchBar() {
  return (
    <div className={style.apInputBox}>
      <input placeholder="Search here..." className={style.apInput}></input>
      <CiSearch className={style.apInputIcon} />
    </div>
  );
}
