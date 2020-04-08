import React from "react";
import "../style.css";
import logo from "../svgFiles/logoLeftTopCorner.svg";

function Navigation() {
  return (
    <nav className="navigation">
      <img src={logo} alt="logo" className="navigation__logo-img" />
    </nav>
  );
}

export default Navigation;
