import React from "react";
import Card from "../UIElements/Card";
import ThumbDown from "../UIElements/ThumbDown";
import ThumbUp from "../UIElements/ThumbUp";

import classes from "./CommentItem.module.css";

const CommentItem = (props) => {
  const recommend = props.recommend === true ? <ThumbUp /> : <ThumbDown />;

  return (
    <li>
      <Card
        className={`${classes.card} ${
          props.type === "teacher" ? classes["teacher-layout"] : ""
        }`}
      >
        <div className={classes.rating}>
          <div className={classes.recommend}>
            <div className={classes.ratingTitle}>推薦</div>
            <p
              className={`${classes.ratingContent} ${classes["recommend-icon"]}`}
            >
              {recommend}
            </p>
          </div>
          <div className={classes.difficulty}>
            <label className={classes.ratingTitle}>難度</label>
            {props.new ? (
              <input />
            ) : (
              <p className={classes.ratingContent}>{props.difficulty}</p>
            )}
          </div>
        </div>
        <div className={classes.content}>
          {props.new ? (
            <select>
              <option>test</option>
            </select>
          ) : (
            <div className={classes.courseName}>{props.courseName}</div>
          )}
          {props.new ? (
            <textarea />
          ) : (
            <p className={classes.comment}>{props.content}</p>
          )}
        </div>
      </Card>
    </li>
  );
};

export default CommentItem;
