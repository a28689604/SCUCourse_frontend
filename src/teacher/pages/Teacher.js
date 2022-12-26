import React, { useEffect, useContext, useReducer, useState } from "react";
import Select from "react-select";

import CommentList from "../../shared/components/Comments/CommentList";
import NewComment from "../../shared/components/Comments/new/NewComment";
import UpdateComment from "../../shared/components/Comments/update/UpdateComment";
import CourseStatistic from "../components/CourseStatistic";

import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useHistory, useParams } from "react-router-dom";
import { AuthContext } from "../../shared/context/auth-context";

import classes from "./Teacher.module.css";
import Loading from "../../shared/components/UIElements/Loading";

const DIFFICULTY_OPTIONS = [
  { value: 1, label: 1 },
  { value: 2, label: 2 },
  { value: 3, label: 3 },
  { value: 4, label: 4 },
  { value: 5, label: 5 },
];

// use reducer in order to set multiple state at once
const teacherDataReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return {
        ...state,
        loadedTeacher: action.value,
        loadedCourse: action.value.courses,
        loadedReviews: action.value.courses
          .filter((course) => course.reviews.length > 0)
          .flatMap((course) => course.reviews)
          .sort(function (a, b) {
            const keyA = a.upVotes,
              keyB = b.upVotes;
            if (keyA < keyB) return 1;
            if (keyA > keyB) return -1;
            return 0;
          }),
        loadedCourseOptions: action.value.courses
          .sort(function (a, b) {
            const keyA = a.syear,
              keyB = b.syear;
            if (keyA < keyB) return 1;
            if (keyA > keyB) return -1;
            return 0;
          })
          .map((course) => {
            return {
              label: `${course.syear}學年 第${course.smester}學期 ${course.department} ${course.courseName}`,
              value: course._id,
            };
          }),
      };

    default:
      return state;
  }
};

const Teacher = (props) => {
  const auth = useContext(AuthContext);
  const [teacherDataState, dispatch] = useReducer(teacherDataReducer);
  const { isLoading, error, sendRequset, clearError } = useHttpClient();
  const [courseScoreData, setCourseScoreData] = useState([]);
  const [isSelect, setIsSelect] = useState(false);

  const teacherName = useParams().teacherId;
  const history = useHistory();

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const responseData = await sendRequset(`${process.env.REACT_APP_BACKEND_URL}/teachers/${teacherName}`);
        dispatch({ type: "SET", value: responseData.data.data });
        // 設定網頁標題
        document.title = teacherName;
      } catch (err) {}
    };
    fetchTeacher();
  }, [sendRequset, teacherName]);

  let userComment;
  let userVotes;

  if (teacherDataState) {
    userComment = teacherDataState.loadedReviews.filter((review) => review.user === auth.userId)[0];
    userVotes = teacherDataState.loadedReviews.flatMap((review) => review.votes).filter((vote) => vote.voter === auth.userId);

    // IMPORTANT manipulate the review data, in order to add current user votes for each review. (brute solution, need fix
    for (let i = 0; i < teacherDataState.loadedReviews.length; i++) {
      for (let j = 0; j < userVotes.length; j++) {
        if (teacherDataState.loadedReviews[i].id === userVotes[j].review) {
          teacherDataState.loadedReviews[i].userVotes = userVotes[j].vote;
        }
      }
    }
  }

  const courseStatisticHandler = (event) => {
    const selectedData = teacherDataState.loadedCourse
      .filter((course) => {
        return course.id === event.value;
      })
      .map((course) => {
        return [
          { name: "0~49", 人數: course.zero },
          { name: "50~59", 人數: course.fifty },
          { name: "60~64", 人數: course.sixty },
          { name: "65~69", 人數: course.sixtyFive },
          { name: "70~74", 人數: course.seventy },
          { name: "75~79", 人數: course.seventyFive },
          { name: "80~84", 人數: course.eighty },
          { name: "85~89", 人數: course.eightyFive },
          { name: "90~94", 人數: course.ninety },
          { name: "95~100", 人數: course.ninetyFive },
          { avg: course.scoreAverage },
          { popularity: course.coursePopularity },
        ];
      });
    setCourseScoreData(selectedData[0]);
    setIsSelect(true);
  };

  const errorHandler = () => {
    clearError();
    history.goBack();
  };

  if (isLoading) {
    return <Loading overlay />;
  }

  return (
    <>
      <ErrorModal error={error} onClear={errorHandler} />
      {!isLoading && teacherDataState && (
        <>
          <div className={classes["teacher-Layout"]}>
            <div className={classes["teacher-statistic"]}>
              <h1 className={classes["teacher-name"]}>{teacherDataState.loadedTeacher.teacherName}</h1>
              <div className={classes.recommend}>
                {teacherDataState.loadedTeacher.recommendPercentage !== -1 && <h2>{(teacherDataState.loadedTeacher.recommendPercentage * 100).toFixed(2)}%</h2>}
                {teacherDataState.loadedTeacher.recommendPercentage === -1 && <h2>暫無資料</h2>}
                <h4>推薦率</h4>
              </div>
              <div className={classes.difficulty}>
                {teacherDataState.loadedTeacher.difficultyAverage !== -1 && (
                  <>
                    <h3>{teacherDataState.loadedTeacher.difficultyAverage.toFixed(1)}</h3>
                    <h5>/5</h5>
                  </>
                )}
                {teacherDataState.loadedTeacher.difficultyAverage === -1 && <h3>暫無資料</h3>}
                <h4>難度</h4>
              </div>
            </div>
            <div className={classes["course-statistic"]}>
              {!isLoading && teacherDataState && (
                <>
                  <Select options={teacherDataState.loadedCourseOptions} onChange={courseStatisticHandler} placeholder={"在此選擇課程，以查看修課成績分數分布"} />
                  <div className={classes.courseScoreAvg}>
                    {isSelect && (
                      <h3>
                        平均分數:
                        {courseScoreData[10] ? courseScoreData[10].avg : "暫無資料"}
                      </h3>
                    )}
                    {/* {isSelect && (
                      <h3>
                        人氣度:
                        {courseScoreData[11].popularity
                          ? courseScoreData[11].popularity.toFixed(2)
                          : "暫無資料"}
                      </h3>
                    )} */}
                  </div>
                  <CourseStatistic data={courseScoreData} />
                </>
              )}
            </div>
          </div>
          <div className={classes["comment-layout"]}>
            <div className={classes["personal-comment"]}>
              {!isLoading && userComment && <UpdateComment userComment={userComment} difficultyData={DIFFICULTY_OPTIONS} courseNameData={teacherDataState.loadedCourseOptions} />}
              {!userComment && <NewComment new difficultyData={DIFFICULTY_OPTIONS} courseNameData={teacherDataState.loadedCourseOptions} />}
            </div>
            <div className={classes["comment-list"]}>
              {teacherDataState.loadedReviews.length === 0 && <h1>這位教授還沒有評論，快來留下你的評論吧!</h1>}
              {!isLoading && teacherDataState.loadedReviews && <CommentList data={teacherDataState.loadedReviews} userVotes={userVotes} type="teacher" />}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Teacher;
