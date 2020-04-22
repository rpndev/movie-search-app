import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <div className="header-form">
        <h1 className="demo_style">MOVIE SEARCH</h1>
        <div>
          <Link to="/login" className="login">
            Log in
          </Link>
          <Link to="/free" className="free_trial">
            Start your free trial
          </Link>
        </div>
      </div>
      <div className="header-title">
        <h1 className="demo_style">Popular Titles</h1>
      </div>
    </>
  );
}

export default Header;
