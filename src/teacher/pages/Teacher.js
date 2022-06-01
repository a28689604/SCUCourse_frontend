import React from "react";
import CommentList from "../../shared/components/Comments/CommentList";

import classes from "./Teacher.module.css";

const DUMMY_TEACHER_DATA = [];

const DUMMY_COMMENTS = [
  {
    id: "p1",
    courseName: "course Name1",
    recommend: "true",
    difficulty: "3",
    content:
      "AAAAAAAAAAAAAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaasdsdsdsffffffffffffff",
  },
];

const Teacher = (props) => {
  return (
    <div>
      <div className={classes["teacher-Layout"]}>
        <div className={classes["teacher-statistic"]}>
          <h1 className={classes["teacher-name"]}>潘維大</h1>
          <div className={classes.recommend}>
            <h2>46%</h2>
            <h4>推薦率</h4>
          </div>
          <div className={classes.difficulty}>
            <h3>3/5</h3>
            <h4>難度</h4>
          </div>
        </div>
        <div className={classes["course-statistic"]}> </div>
      </div>
      <div className={classes["comment-list"]}>
        <CommentList data={DUMMY_COMMENTS} />
      </div>
    </div>
  );
};

export default Teacher;
