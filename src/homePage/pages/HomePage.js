import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import CommentList from "../../shared/components/Comments/CommentList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Carousel from "../components/Carousel";
import Heading from "../components/Heading";

import classes from "./HomePage.module.css";

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

const HomePage = () => {
  const [latestReviews, setLatestReviews] = useState([]);
  const { isLoading, error, sendRequset, clearError } = useHttpClient();

  const searchInputRef = useRef();
  const history = useHistory();

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const responseData = await sendRequset(
          `http://127.0.0.1:5000/api/v1/reviews/latest-reviews`
        );
        setLatestReviews(responseData.data.data);
      } catch (err) {}
    };
    fetchTeacher();
  }, [sendRequset]);

  const searchHandler = (event) => {
    event.preventDefault();
    const enteredTeacher = searchInputRef.current.value;

    history.push({
      pathname: `/teacher/${enteredTeacher}`,
    });
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && latestReviews && (
        <div className={classes.homeLayout}>
          <div className={classes.headingBox}>
            <Heading
              searchHandler={searchHandler}
              searchInputRef={searchInputRef}
            />
          </div>

          <div className={classes.commentBox}>
            <Carousel data={latestReviews} homePage />
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
