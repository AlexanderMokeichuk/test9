import React from "react";
import {NavLink} from "react-router-dom";

const NavBar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg ">
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <NavLink to={"/"} className={"nav-link"}>Categories</NavLink>
          <button className={"nav-link"}>Add</button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;