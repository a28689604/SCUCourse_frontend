import React from "react";
import Card from "../UIElements/Card";

import classes from "./CommentItem.module.css";

const CommentItem = (props) => {
  return (
    <li>
      <Card className={classes.card}>
        <div className={classes.rating}>
          <div className={classes.ratingTitle}>推薦</div>
          <div className={classes.ratingContent}>{props.recommend}</div>
          <div className={classes.ratingTitle}>難度</div>
          <div className={classes.ratingContent}>{props.difficulty}</div>
        </div>
        <div className={classes.content}>
          <div className={classes.courseName}>{props.courseName}</div>
          <p className={classes.comment}>{props.content}</p>
        </div>
      </Card>
    </li>
  );
};

export default CommentItem;
