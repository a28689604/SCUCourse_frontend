import React from "react";
import CommentItem from "./CommentItem";

import classes from "./CommentList.module.css";

const CommentList = (props) => {
  return (
    <section className={classes.comments}>
      <ul>
        {props.data.map((comment) => (
          <CommentItem
            key={comment.id}
            courseName={comment.courseName}
            recommend={comment.recommend}
            difficulty={comment.difficulty}
            content={comment.content}
          />
        ))}
      </ul>
    </section>
  );
};

export default CommentList;
