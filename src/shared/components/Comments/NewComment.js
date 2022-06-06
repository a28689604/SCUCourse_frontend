import { useCallback, useReducer, useState } from "react";
import Add from "../Icons/Add";
import Card from "../UIElements/Card";

import classes from "./NewComment.module.css";
import CommentItem from "./CommentItem";
import CommentRating from "./CommentRating";
import CommentContent from "./CommentContent";
import Input from "../FormElements/Input";
import { VALIDATOR_MINLENGTH } from "../../util/validators";

const DIFFICULTY_OPTIONS = [
  { value: 1, label: 1 },
  { value: 2, label: 2 },
  { value: 3, label: 3 },
  { value: 4, label: 4 },
  { value: 5, label: 5 },
];

const COURSE_OPTIONS = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      console.log("state", state, "action", action);
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      console.log("valid?????", formIsValid);
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };
    default:
      return state;
  }
};

const NewComment = (props) => {
  const [addComment, setAddComment] = useState(false);
  const [thumb, setThumb] = useState(true);

  const changeThumbHandler = () => {
    setThumb((prevState) => !prevState);
  };

  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      difficulty: { value: "", isValid: false },
      courseName: { value: "", isValid: false },
      comment: { value: "", isValid: false },
    },
    isValid: false,
  });

  const addCommentHandler = () => {
    setAddComment(true);
  };

  const disableAddCommentHandler = () => {
    //setAddComment(false);
  };

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: "INPUT_CHANGE",
      value: value,
      isValid: isValid,
      inputId: id,
    });
  }, []);

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
          <CommentItem type="teacher" newComment={true}>
            <CommentRating
              newComment={true}
              thumb={thumb}
              thumbOnClick={changeThumbHandler}
            >
              <Input
                onlyElement={true}
                id="difficulty"
                element="select"
                errorText="請選擇一個難易度"
                options={DIFFICULTY_OPTIONS}
                onInput={inputHandler}
              />
            </CommentRating>
            <CommentContent newComment={true}>
              <Input
                onlyElement={true}
                id="courseName"
                element="select"
                errorText="請選擇一項課程"
                options={COURSE_OPTIONS}
                onInput={inputHandler}
              />
              <Input
                onlyElement={true}
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
