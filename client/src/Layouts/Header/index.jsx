import React from "react";
import TopBar from "../../components/TopBar";
import MainBar from "../../components/MainBar";
import MobileMenu from "../../components/MobileMenu/index.jsx";

export default function Header() {
  return (
    <>
      <TopBar />
      <MobileMenu />
      <MainBar />
    </>
  );
}
