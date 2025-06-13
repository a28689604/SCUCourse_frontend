import React from "react";

import CommentItem from "./CommentItem";
import classes from "./CommentList.module.css";

const CommentList = props => {
  return (
    <section>
      <ul>
        {props.data.map(comment => (
          <CommentItem
            key={comment.id}
            id={comment.id}
            courseName={`${comment.course.syear}學年 第${comment.course.smester}學期 ${comment.course.department} ${comment.course.courseName}`}
            recommend={comment.recommend}
            difficulty={comment.difficulty}
            content={comment.review}
            createAt={comment.createAt}
            upVotes={comment.upVotes}
            downVotes={comment.downVotes}
            type={props.type}
            userVotes={comment.userVotes}
          />
        ))}
      </ul>
    </section>
  );
};

export default CommentList;
