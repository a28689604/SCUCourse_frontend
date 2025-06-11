import { useHistory } from "react-router-dom";
import Difficulty from "../../shared/components/Icons/Difficulty";
import Fire from "../../shared/components/Icons/Fire";
import ThumbUp from "../../shared/components/Icons/ThumbUp";
import Card from "../../shared/components/UIElements/Card";

import classes from "./TeacherSearchItem.module.css";

const TeacherSearchItem = (props) => {
  const history = useHistory();

  const teacherClickHandler = () => {
    history.push({
      pathname: `/teacher/${props.loadedTeachers.teacherName}`,
    });
  };

  return (
    <>
      {props.loadedTeachers && (
        <li>
          <Card className={classes.teacher} onClick={teacherClickHandler}>
            <p>{props.loadedTeachers.teacherName}</p>
            <div className={classes.statistic}>
              <ThumbUp />
              <p>
                {props.loadedTeachers.recommendPercentage !== -1
                  ? `${(props.loadedTeachers.recommendPercentage * 100).toFixed(
                      0
                    )}%`
                  : "0"}
              </p>
            </div>
            <div className={classes.statistic}>
              <Difficulty />
              <p>
                {props.loadedTeachers.difficultyAverage !== -1
                  ? `${props.loadedTeachers.difficultyAverage.toFixed(0)}/5`
                  : "0"}
              </p>
            </div>
            <div className={classes.statistic}>
              <Fire />
              <p>{props.loadedTeachers.ratingsQuantity}</p>
            </div>
          </Card>
        </li>
      )}
    </>
  );
};

export default TeacherSearchItem;
