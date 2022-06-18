import React from "react";

import Card from "../UIElements/Card";
import CommentRating from "./CommentRating";
import CommentContent from "./CommentContent";
import CommentOption from "./CommentOption";

import classes from "./CommentItem.module.css";

const CommentItem = (props) => {
  const createAt = new Date(props.createAt).toLocaleDateString("zh-TW");
  const cardClickHandler = () => {
    return props.onCommentClick ? props.onCommentClick(props.teacherName) : "";
  };

  const commentCotent = !props.content
    ? ""
    : props.content.length > 50
    ? props.content.substring(0, 50) + "..."
    : props.content;

  // if (props.id) {
  //   console.log(props.userVotes);
  // }

  return (
    <li>
      <Card
        className={`${classes.card} ${
          props.type === "teacher"
            ? classes["teacher-layout"]
            : props.type === "personal"
            ? classes["personal-comment-layout"]
            : props.homePage
            ? classes["home-page-layout"]
            : ""
        }`}
        onClick={cardClickHandler}
      >
        {props.newComment && <>{props.children}</>}
        {!props.newComment && (
          <>
            <CommentRating
              recommend={props.recommend}
              difficulty={props.difficulty}
            />
            {props.substringReview && (
              <CommentContent
                content={commentCotent}
                courseName={props.courseName}
              />
            )}
            {!props.substringReview && (
              <CommentContent
                content={props.content}
                courseName={props.courseName}
              />
            )}
            {!props.homePage && (
              <CommentOption
                createAt={createAt}
                upVotes={props.upVotes}
                downVotes={props.downVotes}
                userVotes={props.userVotes}
                id={props.id}
              />
            )}
            {props.homePage && (
              <div className={classes.homePageCreateAt}>{createAt}</div>
            )}
          </>
        )}
      </Card>
    </li>
  );
};

export default CommentItem;
