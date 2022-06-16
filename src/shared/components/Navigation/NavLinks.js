import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";

import classes from "./NavLinks.module.css";

const NavLinks = (props) => {
  const auth = useContext(AuthContext);

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
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth" exact>
            登入
          </NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <button onClick={auth.logout}>登出</button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
