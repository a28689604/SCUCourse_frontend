import React, { useEffect, useState } from "react";
import CommentList from "../../shared/components/Comments/CommentList";
import NewComment from "../../shared/components/Comments/new/NewComment";
import UpdateComment from "../../shared/components/Comments/update/UpdateComment";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useHistory, useParams } from "react-router-dom";

import classes from "./Teacher.module.css";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

const DUMMY_TEACHER_DATA = [];

const DUMMY_COMMENTS = [
  {
    id: "p1",
    courseName: "course Name1",
    recommend: true,
    difficulty: "3",
    content:
      "基本上很看出席，因為他課堂上也是會有些作業，出席的人才會知道，然後每節都有分組或個人作業，如果沒有疫情要跑去桃銘參觀，怕麻煩或對美術沒興趣的人不要來",
  },
  {
    id: "p2",
    courseName: "course Name2",
    recommend: false,
    difficulty: "1",
    content:
      "上課很不明所以 真的不推 每次都會被老師氣到 一直朝夕令改 作業幾乎每堂課都有 不過期中分數很好拿是唯一優點吧",
  },
  {
    id: "p3",
    courseName: "course Name3",
    recommend: true,
    difficulty: "5",
    content:
      "這課很好過，但每次上課都會點名，老師有時反覆不定，所以要一直向她確認以免到時候吃大虧，分數都給的不錯（即使上課都在玩手機），期末會有口頭報告，資料一定要詳細",
  },
];

const DIFFICULTY_OPTIONS = [
  { value: 1, label: 1 },
  { value: 2, label: 2 },
  { value: 3, label: 3 },
  { value: 4, label: 4 },
  { value: 5, label: 5 },
];

const COURSE_OPTIONS = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const userHasComment = true;

const Teacher = (props) => {
  const [loadedTeacher, setLoadedTeacher] = useState({});
  const [loadedCourse, setLoadedCourse] = useState([]);
  const { isLoading, error, sendRequset, clearError } = useHttpClient();

  const teacherName = useParams().teacherId;

  const history = useHistory();

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const responseData = await sendRequset(
          `http://127.0.0.1:5000/api/v1/teachers/${teacherName}`
        );
        setLoadedTeacher(responseData.data.data);
        setLoadedCourse(responseData.data.data.courses);
      } catch (err) {}
    };
    fetchTeacher();
  }, [sendRequset, teacherName]);

  // console.log(loadedCourse.map((course) => console.log(course)));
  const reviews = loadedCourse
    .filter((course) => course.reviews.length > 0)
    .flatMap((course) => course.reviews);

  console.log(reviews);

  const errorHandler = () => {
    clearError();
    history.push("/");
  };

  return (
    <>
      <ErrorModal error={error} onClear={errorHandler} />
      <div className={classes["teacher-Layout"]}>
        <div className={classes["teacher-statistic"]}>
          <h1 className={classes["teacher-name"]}>
            {loadedTeacher.teacherName}
          </h1>
          <div className={classes.recommend}>
            {loadedTeacher.recommendPercentage !== -1 && (
              <h2>{(loadedTeacher.recommendPercentage * 100).toFixed(2)}%</h2>
            )}
            {loadedTeacher.recommendPercentage === -1 && <h2>暫無資料</h2>}
            <h4>推薦率</h4>
          </div>
          <div className={classes.difficulty}>
            {loadedTeacher.difficultyAverage !== -1 && (
              <h3>{loadedTeacher.difficultyAverage}/5</h3>
            )}
            {loadedTeacher.difficultyAverage === -1 && <h3>暫無資料</h3>}
            <h4>難度</h4>
          </div>
        </div>
        <div className={classes["course-statistic"]}> </div>
      </div>
      <div className={classes["comment-layout"]}>
        <div className={classes["personal-comment"]}>
          {userHasComment && (
            <UpdateComment
              difficultyData={DIFFICULTY_OPTIONS}
              courseNameData={COURSE_OPTIONS}
            />
          )}
          {!userHasComment && (
            <NewComment
              new
              difficultyData={DIFFICULTY_OPTIONS}
              courseNameData={COURSE_OPTIONS}
            />
          )}
        </div>
        <div className={classes["comment-list"]}>
          {/* {!isloading && loadedComments && (
            <CommentList data={DUMMY_COMMENTS} type="teacher" />
          )} */}
          (
          <CommentList data={DUMMY_COMMENTS} type="teacher" />)
        </div>
      </div>
    </>
  );
};

export default Teacher;
