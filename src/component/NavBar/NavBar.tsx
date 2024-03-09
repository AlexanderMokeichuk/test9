import React from "react";
import {NavLink} from "react-router-dom";
import {useAppDispatch} from "../../app/hooks.ts";
import {showModalTransaction} from "../../store/budgetSlice.ts";

const NavBar: React.FC = () => {
  const dispatch = useAppDispatch();

  return (
    <nav className="navbar navbar-expand-lg ">
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <NavLink to={"/categories"} className={"nav-link"}>Categories</NavLink>
          <button onClick={() => dispatch(showModalTransaction())} className={"nav-link"}>Add</button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;