import React, { useContext, useRef } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";
import MainHeader from "./MainHeader";

import Home from "../Icons/Home";
import classes from "./MainNavigation.module.css";
import Login from "../Icons/Login";
import Logout from "../Icons/Logout";
import Search from "../Icons/Search";

import { getAnalytics, logEvent } from "firebase/analytics";

const MainNavigation = (props) => {
  // GA stuff

  const analytics = getAnalytics();
  logEvent(analytics, "Search Action");

  const auth = useContext(AuthContext);

  const searchInputRef = useRef();
  const history = useHistory();

  const searchHandler = (event) => {
    event.preventDefault();
    const enteredTeacher = searchInputRef.current.value;
    if (enteredTeacher) {
      history.push({
        pathname: `/teacher/find/${enteredTeacher}`,
      });
    }
    searchInputRef.current.value = "";
  };

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
        <form className={classes.search} onSubmit={searchHandler}>
          <input type="text" className={classes["search-input"]} ref={searchInputRef} placeholder="輸入老師姓名..." />
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
