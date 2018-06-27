import React from "react";
import "./Nav.css";

const Nav = () => (
  <nav className="navbar navbar-expand-md fixed-top bg-light navbar-light justify-content-between bg-primary">
    <ul className="navbar-nav navbar-right">
      <li>
        <a className="navbar-brand" href="/">
          <img src="../assets/images/logo.png" alt="logo"/>
        </a>
      </li>
      <li className="nav-item active">
        <a className="nav-link" href="/">
          Home
        </a>
      </li>
      <li className="nav-item active">
        <a className="nav-link" href="/saved">
          Saved Articles
        </a>
      </li>
    </ul>

  </nav>
);

export default Nav;
