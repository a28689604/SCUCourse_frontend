import React from "react";
import Card from "../UIElements/Card";

import classes from "./CommentItem.module.css";

import CommentRating from "./CommentRating";
import CommentContent from "./CommentContent";

const CommentItem = (props) => {
  return (
    <li>
      <Card
        className={`${classes.card} ${
          props.type === "teacher" ? classes["teacher-layout"] : ""
        }`}
      >
        {props.newComment && <>{props.children}</>}
        {!props.newComment && (
          <>
            <CommentRating
              recommend={props.recommend}
              difficulty={props.difficulty}
            />
            <CommentContent
              content={props.content}
              courseName={props.courseName}
            />
          </>
        )}
      </Card>
    </li>
  );
};

export default CommentItem;
