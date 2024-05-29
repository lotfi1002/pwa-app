import React from "react";
import { Navbar } from "../Navbare/Navbar";

class Header extends React.Component {
  render() {
    return(
      <header id="header"
      className="navbar"
      style={{
        padding: "0px",
        margin: "0px",
        border: "none",
        background: "rgb(0, 0, 0)",
        borderRadius: "0px",
        minHeight: "40px",
        zIndex: 2,
      }}>
       <Navbar/>
      </header>
      
    );
  }
}

export default Header;