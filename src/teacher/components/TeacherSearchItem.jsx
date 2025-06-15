import { useHistory } from "react-router-dom";

import Difficulty from "../../shared/components/Icons/Difficulty";
import Fire from "../../shared/components/Icons/Fire";
import ThumbUp from "../../shared/components/Icons/ThumbUp";
import Card from "../../shared/components/UIElements/Card";
import classes from "./TeacherSearchItem.module.css";

const TeacherSearchItem = props => {
  const history = useHistory();
  const teacher = props.loadedTeachers;

  const teacherClickHandler = () => {
    history.push({
      pathname: `/teacher/${teacher.teacherName}`,
    });
  };

  const formatPercentage = percentage => {
    if (percentage === -1 || percentage === null || percentage === undefined) {
      return "無資料";
    }
    return `${(percentage * 100).toFixed(0)}%`;
  };

  const formatDifficulty = difficulty => {
    if (difficulty === -1 || difficulty === null || difficulty === undefined) {
      return "無資料";
    }
    return `${difficulty.toFixed(1)}/5`;
  };

  const formatRatingCount = count => {
    if (!count || count === 0) {
      return "尚無評價";
    }
    return `${count} 則評價`;
  };

  const getRecommendationLevel = percentage => {
    if (percentage === -1 || percentage === null || percentage === undefined) {
      return "unknown";
    }
    const percent = percentage * 100;
    if (percent >= 80) return "high";
    if (percent >= 60) return "medium";
    return "low";
  };

  const getDifficultyLevel = difficulty => {
    if (difficulty === -1 || difficulty === null || difficulty === undefined) {
      return "unknown";
    }
    if (difficulty >= 4) return "high";
    if (difficulty >= 3) return "medium";
    return "low";
  };

  if (!teacher) {
    return null;
  }

  return (
    <div className={classes.teacherItem}>
      <Card className={classes.teacherCard} onClick={teacherClickHandler}>
        <div className={classes.teacherHeader}>
          <h3 className={classes.teacherName}>{teacher.teacherName}</h3>
          <div className={classes.teacherMeta}>
            <span className={classes.department}>
              {teacher.department || "未分類"}
            </span>
          </div>
        </div>

        <div className={classes.statisticsGrid}>
          <div className={`${classes.statistic} ${classes.recommendation}`}>
            <div className={classes.statisticIcon}>
              <ThumbUp />
            </div>
            <div className={classes.statisticContent}>
              <span
                className={`${classes.statisticValue} ${classes[getRecommendationLevel(teacher.recommendPercentage)]}`}
              >
                {formatPercentage(teacher.recommendPercentage)}
              </span>
              <span className={classes.statisticLabel}>推薦度</span>
            </div>
          </div>

          <div className={`${classes.statistic} ${classes.difficulty}`}>
            <div className={classes.statisticIcon}>
              <Difficulty />
            </div>
            <div className={classes.statisticContent}>
              <span
                className={`${classes.statisticValue} ${classes[getDifficultyLevel(teacher.difficultyAverage)]}`}
              >
                {formatDifficulty(teacher.difficultyAverage)}
              </span>
              <span className={classes.statisticLabel}>難度</span>
            </div>
          </div>

          <div className={`${classes.statistic} ${classes.ratings}`}>
            <div className={classes.statisticIcon}>
              <Fire />
            </div>
            <div className={classes.statisticContent}>
              <span className={classes.statisticValue}>
                {formatRatingCount(teacher.ratingsQuantity)}
              </span>
              <span className={classes.statisticLabel}>熱門度</span>
            </div>
          </div>
        </div>

        <div className={classes.cardFooter}>
          <span className={classes.clickHint}>點擊查看詳細資訊</span>
        </div>
      </Card>
    </div>
  );
};

export default TeacherSearchItem;
