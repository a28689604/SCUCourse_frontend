import { useState } from "react";
import ThumbDown from "../Icons/ThumbDown";
import ThumbUp from "../Icons/ThumbUp";

import classes from "./CommentRating.module.css";

const CommentRating = (props) => {
  const [thumb, setThumb] = useState(true);

  const changeThumbHandler = () => {
    setThumb((prevState) => !prevState);
  };

  return (
    <div className={classes.rating}>
      <div className={classes["rating-title"]}>推薦</div>

      <p
        className={`${classes["rating-content"]} ${classes["recommend-icon"]}`}
      >
        {props.new ? (
          <>
            {thumb && <ThumbUp onClick={changeThumbHandler} />}
            {!thumb && <ThumbDown onClick={changeThumbHandler} />}
          </>
        ) : (
          <>
            {props.recommend && <ThumbUp />}
            {!props.recommend && <ThumbDown />}
          </>
        )}
      </p>
      <label className={classes["rating-title"]}>難度</label>
      {props.new ? (
        <select
          className={`${classes["rating-content"]} ${classes["rating-select"]}`}
        >
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
      ) : (
        <p className={classes["rating-content"]}>{props.difficulty}</p>
      )}
    </div>
  );
};

export default CommentRating;
