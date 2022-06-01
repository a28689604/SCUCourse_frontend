import CommentList from "../../shared/components/Comments/CommentList";

import classes from "./HomePage.module.css";

const DUMMY_COMMENTS = [
  {
    id: "p1",
    courseName: "course Name1",
    recommend: "true",
    difficulty: "3",
    content:
      "AAAAAAAAAAAAAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaasdsdsdsffffffffffffff",
  },
];

const HomePage = () => {
  return (
    <div className={classes.homeLayout}>
      <div className={classes.headingBox}>
        <h1 className={classes.headingPrimary}>探索</h1>
        <p className={classes.headingSecondary}>課程與教授評價</p>
        <input className={classes.input} type="text" />
      </div>

      <div className={classes.commentBox}>
        <CommentList data={DUMMY_COMMENTS} />
      </div>
    </div>
  );
};

export default HomePage;
