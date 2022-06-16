import { useEffect, useState } from "react";
import Add from "../../Icons/Add";
import Card from "../../UIElements/Card";

import CommentItem from "../CommentItem";
import CommentRating from "../CommentRating";
import CommentContent from "../CommentContent";
import Input from "../../FormElements/Input";
import { VALIDATOR_MINLENGTH } from "../../../util/validators";
import { useForm } from "../../../hooks/form-hook";

import classes from "./NewComment.module.css";

const NewComment = (props) => {
  const [addComment, setAddComment] = useState(false);
  const [thumb, setThumb] = useState(true);

  const [formState, inputHandler] = useForm(
    {
      difficulty: {
        value: "",
        isValid: false,
      },
      courseName: {
        value: "",
        isValid: false,
      },
      comment: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  //IMPORTANT GET SOME FETCH VALUE

  const addCommentHandler = () => {
    setAddComment(true);
  };

  const disableAddCommentHandler = () => {
    //setAddComment(false);
  };

  const changeThumbHandler = () => {
    setThumb((prevState) => !prevState);
  };

  const commentSubmitHandler = (event) => {
    event.preventDefault();
    console.log("thumb", thumb, formState.inputs);
  };

  return (
    <>
      {!addComment && (
        <Card className={classes["new-comment"]} onClick={addCommentHandler}>
          <div className={classes.paragraph}>留下你的評論</div>
          <Add />
        </Card>
      )}
      {addComment && (
        <form
          onClick={disableAddCommentHandler}
          onSubmit={commentSubmitHandler}
        >
          <CommentItem type="personal" newComment={true}>
            <CommentRating
              personalRating
              newComment={true}
              thumb={thumb}
              thumbOnClick={changeThumbHandler}
            >
              <Input
                onlyElement
                id="difficulty"
                element="select"
                errorText="請選擇一個難易度"
                options={props.difficultyData}
                onInput={inputHandler}
              />
            </CommentRating>
            <CommentContent newComment={true}>
              <Input
                onlyElement
                id="courseName"
                element="select"
                errorText="請選擇一項課程"
                options={props.courseNameData}
                onInput={inputHandler}
              />
              <Input
                onlyElement
                id="comment"
                element="textarea"
                errorText="請輸入評論"
                onInput={inputHandler}
                validators={[VALIDATOR_MINLENGTH(5)]}
              />
            </CommentContent>
            <button type="submit" disabled={!formState.isValid} />
          </CommentItem>
        </form>
      )}
    </>
  );
};

export default NewComment;
