import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Loading from "../../shared/components/UIElements/Loading";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Carousel from "../components/Carousel";
import Heading from "../components/Heading";

import classes from "./HomePage.module.css";

const HomePage = () => {
  const [latestReviews, setLatestReviews] = useState([]);
  const { isLoading, error, sendRequset, clearError } = useHttpClient();

  const searchInputRef = useRef();
  const history = useHistory();

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const responseData = await sendRequset(
          `${process.env.REACT_APP_BACKEND_URL}/reviews/latest-reviews`
        );
        setLatestReviews(responseData.data.data);
      } catch (err) {}
    };
    fetchTeacher();
  }, [sendRequset]);

  const searchHandler = (event) => {
    event.preventDefault();
    const enteredTeacher = searchInputRef.current.value;
    if (enteredTeacher) {
      history.push({
        pathname: `/teacher/find/${enteredTeacher}`,
      });
    }
  };

  const commentClickHandler = (teacherName) => {
    history.push({
      pathname: `/teacher/${teacherName}`,
    });
  };

  if (isLoading) {
    return <Loading overlay />;
  }

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
            <Carousel
              data={latestReviews}
              onCommentClick={commentClickHandler}
              homePage
              substringReview
            />
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
