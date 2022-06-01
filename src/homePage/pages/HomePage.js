import CommentList from "../../shared/components/Comments/CommentList";
import Heading from "../components/Heading";

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
        <Heading />
      </div>

      <div className={classes.commentBox}>
        <CommentList data={DUMMY_COMMENTS} />
      </div>
    </div>
  );
};

export default HomePage;
