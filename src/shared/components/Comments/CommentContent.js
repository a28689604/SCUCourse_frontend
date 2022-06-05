import Input from "../FormElements/Input";
import { VALIDATOR_REQUIRE } from "../../util/validators";

import classes from "./CommentContent.module.css";

const CommentContent = (props) => {
  return (
    <div className={classes.content}>
      {props.new ? (
        <select className={classes.courseName}>
          <option>test</option>
        </select>
      ) : (
        <div className={classes.courseName}>{props.courseName}</div>
      )}
      {props.new ? (
        <Input
          id={props.id}
          onlyElement={true}
          element="textarea"
          validators={[VALIDATOR_REQUIRE()]}
          errorText={props.errorText}
          onInput={props.onInput}
          className={classes.comment}
        />
      ) : (
        <p className={classes.comment}>{props.content}</p>
      )}
    </div>
  );
};

export default CommentContent;
