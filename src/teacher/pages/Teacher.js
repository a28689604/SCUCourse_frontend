import React from "react";
import CommentList from "../../shared/components/Comments/CommentList";
import NewComment from "../../shared/components/Comments/NewComment";

import classes from "./Teacher.module.css";

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

const Teacher = (props) => {
  return (
    <div>
      <div className={classes["teacher-Layout"]}>
        <div className={classes["teacher-statistic"]}>
          <h1 className={classes["teacher-name"]}>潘維大</h1>
          <div className={classes.recommend}>
            <h2>46%</h2>
            <h4>推薦率</h4>
          </div>
          <div className={classes.difficulty}>
            <h3>3/5</h3>
            <h4>難度</h4>
          </div>
        </div>
        <div className={classes["course-statistic"]}> </div>
      </div>
      <div className={classes["comment-layout"]}>
        <div className={classes["new-comment"]}>
          <NewComment />
        </div>
        <div className={classes["comment-list"]}>
          <CommentList data={DUMMY_COMMENTS} type="teacher" />
        </div>
      </div>
    </div>
  );
};

export default Teacher;
