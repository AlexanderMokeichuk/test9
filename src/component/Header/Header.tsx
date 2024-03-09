import React from "react";
import {Link} from "react-router-dom";
import NavBar from "../NavBar/NavBar.tsx";

const Header:React.FC = () => {
  return (
    <header className={"border-bottom p-3"}>
      <div className={"container d-flex align-items-center  justify-content-between"}>
        <Link to={"/"} className={"nav-link"}>
          <h4>Finance Tracker</h4>
        </Link>
        <NavBar />
      </div>
    </header>
  );
};

export default Header;