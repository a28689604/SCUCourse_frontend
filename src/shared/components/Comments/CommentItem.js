import React from "react";
import { useHistory } from "react-router-dom";

import Card from "../UIElements/Card";
import CommentRating from "./CommentRating";
import CommentContent from "./CommentContent";
import CommentOption from "./CommentOption";

import classes from "./CommentItem.module.css";

const CommentItem = (props) => {
  const createAt = new Date(props.createAt).toLocaleDateString("zh-TW");
  const history = useHistory();

  const commentClickHandler = () => {
    if (props.homePage) {
      history.push({
        pathname: `/teacher/${props.teacherName}`,
      });
    }
  };

  return (
    <li>
      <Card
        className={`${classes.card} ${
          props.type === "teacher"
            ? classes["teacher-layout"]
            : props.type === "personal"
            ? classes["personal-comment-layout"]
            : ""
        }`}
        onClick={commentClickHandler}
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
            {!props.homePage && (
              <CommentOption
                createAt={createAt}
                upVotes={props.upVotes}
                downVotes={props.downVotes}
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
