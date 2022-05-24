import React from "react";
import Card from "../UIElements/Card";

import classes from "./CommentItem.module.css";

const CommentItem = (props) => {
  return (
    <li>
      <Card className={classes.card}>
        <div className={classes.rating}>
          <div>{props.recommend}</div>
          <div>{props.difficulty}</div>
        </div>
        <div className={classes.content}>
          <div>{props.courseName}</div>
          <p>{props.content}</p>
        </div>
      </Card>
    </li>
  );
};

export default CommentItem;
