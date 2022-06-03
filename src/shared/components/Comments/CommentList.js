import React from "react";
import CommentItem from "./CommentItem";

import classes from "./CommentList.module.css";

const CommentList = (props) => {
  return (
    <section
      className={`${classes.comments} ${
        props.type === "teacher" ? classes["teacher-page-layout"] : ""
      }`}
    >
      <ul
        className={` ${
          props.type === "teacher" ? classes["teacher-page-list"] : ""
        }`}
      >
        {props.data.map((comment) => (
          <CommentItem
            key={comment.id}
            courseName={comment.courseName}
            recommend={comment.recommend}
            difficulty={comment.difficulty}
            content={comment.content}
            type={props.type}
          />
        ))}
      </ul>
    </section>
  );
};

export default CommentList;
