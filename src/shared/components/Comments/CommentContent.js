import Input from "../FormElements/Input";

import classes from "./CommentContent.module.css";

const CommentContent = (props) => {
  return (
    <div className={classes.content}>
      {props.new ? (
        <select className={classes.courseName}>
          <option selected="selected">-</option>
        </select>
      ) : (
        <div className={classes.courseName}>{props.courseName}</div>
      )}
      {props.new ? (
        <Input
          className={classes.comment}
          element={props.element}
          errorText={props.errorText}
          id={props.id}
          onlyElement={props.onlyElement}
          onInput={props.onInput}
          validators={props.validators}
        />
      ) : (
        <p className={classes.comment}>{props.content}</p>
      )}
    </div>
  );
};

export default CommentContent;
