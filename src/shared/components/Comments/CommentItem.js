import React from "react";
import Card from "../UIElements/Card";

import classes from "./CommentItem.module.css";
import Input from "../FormElements/Input";
import { VALIDATOR_REQUIRE } from "../../util/validators";
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
          new={props.new}
          id={props.id}
          courseName={props.courseName}
          errorText={props.errorText}
          onInput={props.onInput}
          content={props.content}
        />
      </Card>
    </li>
  );
};

export default CommentItem;
