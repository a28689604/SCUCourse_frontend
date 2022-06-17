import DownVote from "../Icons/DownVote";
import UpVote from "../Icons/UpVote";

import classes from "./CommentOption.module.css";

const CommentOption = (props) => {
  return (
    <div className={classes.optionLayout}>
      <div className={classes.votes}>
        <div className={classes.upVote}>
          <UpVote userVotes={props.userVotes} />
          <h2>{props.upVotes}</h2>
        </div>
        <div className={classes.downVote}>
          <DownVote userVotes={props.userVotes} />
          <h2>{props.downVotes}</h2>
        </div>
      </div>
      <div className={classes.createAt}>
        <p>{props.createAt}</p>
      </div>
    </div>
  );
};

export default CommentOption;
