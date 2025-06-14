import Button from "@mui/material/Button";
import { useContext, useEffect, useReducer, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Select from "react-select";

import CommentList from "../../shared/components/Comments/CommentList";
import NewComment from "../../shared/components/Comments/new/NewComment";
import UpdateComment from "../../shared/components/Comments/update/UpdateComment";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Loading from "../../shared/components/UIElements/Loading";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import AddScore from "../components/AddScore";
import CourseStatistic from "../components/CourseStatistic";
import classes from "./Teacher.module.css";

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
          .filter(course => course.reviews.length > 0)
          .flatMap(course => course.reviews)
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
          .map(course => {
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

const Teacher = () => {
  const auth = useContext(AuthContext);
  const [teacherDataState, dispatch] = useReducer(teacherDataReducer);
  const { isLoading, error, sendRequset, clearError } = useHttpClient();
  const [courseScoreData, setCourseScoreData] = useState([]);
  const [isSelect, setIsSelect] = useState(false);
  const [isAddBtnClick, setIsAddBtnClick] = useState(false);
  const [selectCourse, setSelectCourse] = useState({});

  const teacherName = useParams().teacherId;
  const history = useHistory();

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const responseData = await sendRequset(
          `${import.meta.env.VITE_BACKEND_URL}/teachers/${teacherName}`
        );
        dispatch({ type: "SET", value: responseData.data.data });
        // 設定網頁標題
        document.title = teacherName;
      } catch (error) {
        console.error("Failed to fetch teacher data:", error);
      }
    };
    fetchTeacher();

    // 設定網頁標題
    document.title = teacherName;
  }, [sendRequset, teacherName]);

  let userComment;
  let userVotes;

  if (teacherDataState) {
    userComment = teacherDataState.loadedReviews.filter(
      review => review.user === auth.userId
    )[0];
    userVotes = teacherDataState.loadedReviews
      .flatMap(review => review.votes)
      .filter(vote => vote.voter === auth.userId);

    // IMPORTANT manipulate the review data, in order to add current user votes for each review. (brute solution, need fix
    for (let i = 0; i < teacherDataState.loadedReviews.length; i++) {
      for (let j = 0; j < userVotes.length; j++) {
        if (teacherDataState.loadedReviews[i].id === userVotes[j].review) {
          teacherDataState.loadedReviews[i].userVotes = userVotes[j].vote;
        }
      }
    }
  }

  const courseStatisticHandler = event => {
    const selectedCourse = teacherDataState.loadedCourse.filter(course => {
      return course.id === event.value;
    });
    setSelectCourse(selectedCourse[0]);
    const selectedCourseData = selectedCourse.map(course => {
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
    setCourseScoreData(selectedCourseData[0]);

    setIsSelect(true);
  };

  const errorHandler = () => {
    clearError();
    history.goBack();
  };

  const addScoreBtnHandler = () => {
    setIsAddBtnClick(prevState => !prevState);
  };

  if (isLoading) {
    return <Loading overlay />;
  }
  return (
    <>
      <ErrorModal error={error} onClear={errorHandler} />
      {!isLoading && teacherDataState && (
        <>
          {isAddBtnClick && (
            <AddScore course={selectCourse} onCancel={addScoreBtnHandler} />
          )}
          <div className={classes["teacher-container"]}>
            <div className={classes["teacher-header"]}>
              <div className={classes["teacher-avatar"]}>
                <div className={classes["teacher-initial"]}>
                  {teacherDataState.loadedTeacher.teacherName?.[0] || "T"}
                </div>
              </div>
              <div className={classes["teacher-info"]}>
                <h1 className={classes["teacher-name"]}>
                  {teacherDataState.loadedTeacher.teacherName}
                </h1>
                <div className={classes["teacher-stats"]}>
                  <div className={classes["stat-card"]}>
                    <div className={classes["stat-icon"]}>👍</div>
                    <div className={classes["stat-content"]}>
                      <div className={classes["stat-value"]}>
                        {teacherDataState.loadedTeacher.recommendPercentage !==
                        -1
                          ? `${(teacherDataState.loadedTeacher.recommendPercentage * 100).toFixed(1)}%`
                          : "暫無資料"}
                      </div>
                      <div className={classes["stat-label"]}>推薦率</div>
                    </div>
                  </div>
                  <div className={classes["stat-card"]}>
                    <div className={classes["stat-icon"]}>📊</div>
                    <div className={classes["stat-content"]}>
                      <div className={classes["stat-value"]}>
                        {teacherDataState.loadedTeacher.difficultyAverage !==
                        -1 ? (
                          <>
                            {teacherDataState.loadedTeacher.difficultyAverage.toFixed(
                              1
                            )}
                            <span className={classes["stat-subtext"]}>/5</span>
                          </>
                        ) : (
                          "暫無資料"
                        )}
                      </div>
                      <div className={classes["stat-label"]}>難度</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={classes["course-section"]}>
              <div className={classes["section-header"]}>
                <h2>課程成績分布</h2>
                <p>選擇課程以查看詳細的成績分布統計</p>
              </div>
              <div className={classes["course-selector"]}>
                <Select
                  options={teacherDataState.loadedCourseOptions}
                  onChange={courseStatisticHandler}
                  placeholder="請選擇課程..."
                  menuPortalTarget={document.body}
                  className={classes["select-container"]}
                  classNamePrefix="select"
                  styles={{
                    menuPortal: base => ({ ...base, zIndex: 9999 }),
                    control: (base, state) => ({
                      ...base,
                      minHeight: "48px",
                      border: state.isFocused
                        ? "2px solid #3b82f6"
                        : "2px solid #e5e7eb",
                      borderRadius: "12px",
                      boxShadow: state.isFocused
                        ? "0 0 0 3px rgba(59, 130, 246, 0.1)"
                        : "none",
                      "&:hover": {
                        borderColor: "#3b82f6",
                      },
                    }),
                    placeholder: base => ({
                      ...base,
                      color: "#6b7280",
                      fontWeight: "500",
                    }),
                    option: (base, state) => ({
                      ...base,
                      backgroundColor: state.isSelected
                        ? "#3b82f6"
                        : state.isFocused
                          ? "#f3f4f6"
                          : "white",
                      color: state.isSelected ? "white" : "#374151",
                      padding: "12px 20px",
                    }),
                  }}
                />
              </div>
              <div className={classes["chart-container"]}>
                {!isSelect ? (
                  <div className={classes["empty-state"]}>
                    <div className={classes["empty-icon"]}>📈</div>
                    <h3>請選擇課程</h3>
                    <p>選擇上方的課程以查看成績分布圖表</p>
                  </div>
                ) : courseScoreData[0]["人數"] === null ? (
                  <div className={classes["empty-state"]}>
                    <div className={classes["empty-icon"]}>📊</div>
                    <h3>暫無分數資料</h3>
                    <p>此課程尚未有成績資料</p>
                    <Button
                      variant="contained"
                      size="large"
                      onClick={addScoreBtnHandler}
                      className={classes["add-score-btn"]}
                    >
                      新增分數資料
                    </Button>
                  </div>
                ) : (
                  <div className={classes["chart-wrapper"]}>
                    <div className={classes["chart-info"]}>
                      <h3>
                        平均分數:{" "}
                        {courseScoreData[10]["avg"] !== null
                          ? courseScoreData[10].avg
                          : "暫無資料"}
                      </h3>
                    </div>
                    <CourseStatistic data={courseScoreData} />
                  </div>
                )}
              </div>
            </div>

            <div className={classes["comments-section"]}>
              <div className={classes["section-header"]}>
                <h2>教師評價</h2>
                <p>學生對這位教師的評價與意見</p>
              </div>
              <div className={classes["comments-container"]}>
                <div className={classes["personal-comment"]}>
                  {!isLoading && userComment ? (
                    <UpdateComment
                      userComment={userComment}
                      difficultyData={DIFFICULTY_OPTIONS}
                      courseNameData={teacherDataState.loadedCourseOptions}
                    />
                  ) : (
                    <NewComment
                      new
                      difficultyData={DIFFICULTY_OPTIONS}
                      courseNameData={teacherDataState.loadedCourseOptions}
                    />
                  )}
                </div>
                <div className={classes["comment-list"]}>
                  {teacherDataState.loadedReviews.length === 0 ? (
                    <div className={classes["empty-comments"]}>
                      <div className={classes["empty-icon"]}>💬</div>
                      <h3>還沒有評論</h3>
                      <p>成為第一個評論這位教師的學生吧！</p>
                    </div>
                  ) : (
                    <CommentList
                      data={teacherDataState.loadedReviews}
                      userVotes={userVotes}
                      type="teacher"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Teacher;
