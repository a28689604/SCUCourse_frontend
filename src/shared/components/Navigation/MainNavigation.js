import React from "react";
import { Link } from "react-router-dom";

import MainHeader from "./MainHeader";

import classes from "./MainNavigation.module.css";
import NavLinks from "./NavLinks";

const MainNavigation = (props) => {
  return (
    <MainHeader>
      <button className={classes.MainNavigationBtn}>
        <span />
        <span />
        <span />
      </button>
      <h1 className={classes.MainNavigationTitle}>
        <Link to="/">東吳課程評價</Link>
      </h1>
      <nav>
        <NavLinks />
      </nav>
    </MainHeader>
  );
};

export default MainNavigation;
