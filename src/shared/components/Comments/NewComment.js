import { useState } from "react";
import Input from "../FormElements/Input";
import Card from "../UIElements/Card";
import CommentItem from "./CommentItem";

import classes from "./NewComment.module.css";

const NewComment = (props) => {
  const [addComment, setAddComment] = useState(false);

  const addCommentHandler = () => {
    setAddComment(true);
  };

  const disableAddCommentHandler = () => {
    setAddComment(false);
  };

  // const add = (
  //   <div onClick={addCommentHandler}>
  //     <div className={classes.paragraph}>留下你的評論</div>
  //     <svg
  //       xmlns="http://www.w3.org/2000/svg"
  //       className="h-6 w-6"
  //       fill="none"
  //       viewBox="0 0 24 24"
  //       stroke="currentColor"
  //       strokeWidth={2}
  //     >
  //       <path
  //         strokeLinecap="round"
  //         strokeLinejoin="round"
  //         d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
  //       />
  //     </svg>
  //   </div>
  // );

  return (
    <>
      {!addComment && (
        <Card className={classes["new-comment"]} onClick={addCommentHandler}>
          <div className={classes.paragraph}>留下你的評論</div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </Card>
      )}
      {addComment && (
        <form onClick={disableAddCommentHandler}>
          <CommentItem new={true} />
        </form>
      )}
    </>
  );
};

export default NewComment;
