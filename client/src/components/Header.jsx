import React from "react";
import museumIcon from "../assets/museum.svg";

function Header() {
  return (
    <div className="header-container">
      <img className="museum-icon" src={museumIcon} alt="museum icon" />
      <h1>CURATE 2.0</h1>
    </div>
  );
}

export default Header;
