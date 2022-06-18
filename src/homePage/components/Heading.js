import React from "react";

import classes from "./Heading.module.css";

const Heading = (props) => {
  return (
    <>
      <h1 className={classes.headingPrimary}>探索</h1>
      <p className={classes.headingSecondary}>課程與教授評價</p>
      <form className={classes.search} onSubmit={props.searchHandler}>
        <input
          type="text"
          className={classes["search-input"]}
          ref={props.searchInputRef}
          placeholder="輸入老師姓名..."
        />
        <button className={classes["search-button"]} type="submit">
          搜尋
        </button>
      </form>
    </>
  );
};

export default Heading;
