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
        <CommentRating
          new={props.new}
          recommend={props.recommend}
          difficulty={props.difficulty}
        />
        <CommentContent
          content={props.content}
          courseName={props.courseName}
          element={props.element}
          errorText={props.errorText}
          id={props.id}
          new={props.new}
          onInput={props.onInput}
          onlyElement={props.onlyElement}
          validators={props.validators}
        />
      </Card>
    </li>
  );
};

export default CommentItem;
