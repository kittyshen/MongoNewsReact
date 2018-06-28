import React from "react";
import { Link } from "react-router-dom";

import "./Nav.css";

const Nav = () => (
  <nav className="navbar navbar-expand-md fixed-top bg-light navbar-light justify-content-between bg-primary">
    <ul className="navbar-nav navbar-right">
      <li>
        <a className="navbar-brand" href="/">
          <img src="../../../assets/images/logo.png" alt="logo"/>
        </a>
      </li>
      <li className="nav-item active">
        <Link to="/">Home </Link>
        <a className="nav-link" href="/">
          Home
        </a>
      </li>
      <li className="nav-item active">
        <Link to="/saved">Saved Articles </Link>

        <a className="nav-link" href="/save">
          Saved Articles (same route using 'a' tag will only retrieve serverside data)
        </a>
      </li>
    </ul>

  </nav>
);

export default Nav;
