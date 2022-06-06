import ThumbDown from "../Icons/ThumbDown";
import ThumbUp from "../Icons/ThumbUp";

import classes from "./CommentRating.module.css";

const CommentRating = (props) => {
  return (
    <div className={classes.rating}>
      <label className={classes["rating-title"]} htmlFor="difficulty">
        推薦
      </label>
      <p
        className={`${classes["rating-content"]} ${classes["recommend-icon"]}`}
      >
        {props.newComment && (
          <>
            {props.thumb && <ThumbUp onClick={props.thumbOnClick} />}
            {!props.thumb && <ThumbDown onClick={props.thumbOnClick} />}
          </>
        )}
        {!props.newComment && (
          <>
            {props.recommend && <ThumbUp />}
            {!props.recommend && <ThumbDown />}
          </>
        )}
      </p>
      <label className={classes["rating-title"]}>難度</label>
      {props.newComment && <>{props.children}</>}
      {!props.newComment && (
        <p className={classes["rating-content"]}>{props.difficulty}</p>
      )}
    </div>
  );
};

export default CommentRating;
