import { useCallback, useState } from "react";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../util/validators";
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
            element={"textarea"}
            errorText="請輸入內容"
            id="comment"
            new={true}
            onlyElement={true}
            onInput={titleInputHandler}
            type="teacher"
            validators={[VALIDATOR_MINLENGTH(5)]}
          />
        </form>
      )}
    </>
  );
};

export default NewComment;
