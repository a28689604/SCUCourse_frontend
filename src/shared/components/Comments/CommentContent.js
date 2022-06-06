import classes from "./CommentContent.module.css";

const CommentContent = (props) => {
  return (
    <div className={classes.content}>
      {props.newComment && <>{props.children}</>}
      {!props.newComment && (
        <>
          <div className={classes.courseName}>{props.courseName}</div>
          <p className={classes.comment}>{props.content}</p>
        </>
      )}
    </div>
  );
};

export default CommentContent;
