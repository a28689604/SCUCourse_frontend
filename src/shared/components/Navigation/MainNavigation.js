import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";
import MainHeader from "./MainHeader";

import Home from "../Icons/Home";
import classes from "./MainNavigation.module.css";
import Login from "../Icons/Login";
import Logout from "../Icons/Logout";
import Search from "../Icons/Search";

const MainNavigation = (props) => {
  const auth = useContext(AuthContext);

  return (
    <>
      <MainHeader>
        <div className={classes.homeIcon}>
          <NavLink to="/">
            <Home />
          </NavLink>
        </div>

        <h1 className={classes.MainNavigationTitle}>
          <Link to="/">東吳課程評價</Link>
        </h1>
        <form className={classes.search} onSubmit={props.searchHandler}>
          <input
            type="text"
            className={classes["search-input"]}
            ref={props.searchInputRef}
            placeholder="輸入老師姓名..."
          />
          <button className={classes["search-button"]} type="submit">
            <Search />
          </button>
        </form>
        <nav className={classes["main-navigation__header-nav"]}>
          <ul className={classes["nav-links"]}>
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
        </nav>

        <div className={classes.logInOutIcon}>
          {!auth.isLoggedIn && (
            <NavLink to="/auth" exact>
              <Login />
            </NavLink>
          )}
          {auth.isLoggedIn && (
            <>
              <Logout onClick={auth.logout} />
            </>
          )}
        </div>
      </MainHeader>
    </>
  );
};

export default MainNavigation;
