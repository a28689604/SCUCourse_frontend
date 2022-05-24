import React from "react";
import CommentItem from "./CommentItem";

import classes from "./CommentList.module.css";

const DUMMY_COMMENTS = [
  {
    id: "p1",
    courseName: "course Name1",
    recommend: true,
    difficulty: "3",
    content: "AAAAAAAAAAAAA",
  },
];

const CommentList = (props) => {
  return (
    <section className={classes.comments}>
      <h2>最新評論</h2>
      <ul>
        {DUMMY_COMMENTS.map((comment) => (
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
