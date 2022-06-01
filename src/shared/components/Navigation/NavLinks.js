import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./NavLinks.module.css";

const NavLinks = (props) => {
  return (
    <ul className={classes["nav-links"]}>
      <li>
        <NavLink to="/" exact>
          HOME
        </NavLink>
      </li>
      <li>
        <NavLink to="/explore" exact>
          探索
        </NavLink>
      </li>
      <li>
        <NavLink to="/auth" exact>
          登入
        </NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
