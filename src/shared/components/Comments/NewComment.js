import { useCallback, useState } from "react";
import Add from "../Icons/Add";
import Card from "../UIElements/Card";
import CommentItem from "./CommentItem";

import classes from "./NewComment.module.css";

const NewComment = (props) => {
  const [addComment, setAddComment] = useState(false);

  const addCommentHandler = () => {
    setAddComment(true);
  };

  const disableAddCommentHandler = () => {
    //setAddComment(false);
  };

  const titleInputHandler = useCallback((id, value, isValid) => {}, []);

  return (
    <>
      {!addComment && (
        <Card className={classes["new-comment"]} onClick={addCommentHandler}>
          <div className={classes.paragraph}>留下你的評論</div>
          <Add />
        </Card>
      )}
      {addComment && (
        <form onClick={disableAddCommentHandler}>
          <CommentItem
            id="comment"
            new={true}
            type="teacher"
            errorText="請輸入內容"
            onInput={titleInputHandler}
          />
        </form>
      )}
    </>
  );
};

export default NewComment;
