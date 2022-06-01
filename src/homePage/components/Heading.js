import React from "react";

import classes from "./Heading.module.css";

const Heading = (props) => {
  return (
    <>
      <h1 className={classes.headingPrimary}>探索</h1>
      <p className={classes.headingSecondary}>課程與教授評價</p>
      <input className={classes.input} type="text" />
    </>
  );
};

export default Heading;
