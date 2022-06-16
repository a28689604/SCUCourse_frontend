import React from "react";
import Input from "../../shared/components/FormElements/Input";

import classes from "./Heading.module.css";

const Heading = (props) => {
  return (
    <>
      <h1 className={classes.headingPrimary}>探索</h1>
      <p className={classes.headingSecondary}>課程與教授評價</p>
      <form onSubmit={props.searchHandler}>
        <input type="text" ref={props.searchInputRef} />
        <button type="submit">搜尋</button>
      </form>
    </>
  );
};

export default Heading;
