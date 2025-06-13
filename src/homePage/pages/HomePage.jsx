import Stack from "@mui/material/Stack";
import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";

import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Loading from "../../shared/components/UIElements/Loading";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Carousel from "../components/Carousel";
import Heading from "../components/Heading";

const HomePage = () => {
  const [latestReviews, setLatestReviews] = useState([]);
  const { isLoading, error, sendRequset, clearError } = useHttpClient();

  const searchInputRef = useRef();
  const history = useHistory();

  document.title = "首頁";

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const responseData = await sendRequset(
          `${import.meta.env.VITE_BACKEND_URL}/reviews/latest-reviews`
        );
        setLatestReviews(responseData.data.data);
      } catch (err) {
        console.error("API call failed:", err);
      }
    };
    fetchTeacher();
    //設定網頁title
    document.title = "首頁";
  }, [sendRequset]);

  const searchHandler = event => {
    event.preventDefault();
    const enteredTeacher = searchInputRef.current.value;
    if (enteredTeacher) {
      history.push({
        pathname: `/teacher/find/${enteredTeacher}`,
      });
    }
  };

  const commentClickHandler = teacherName => {
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
        <Stack
          spacing={2}
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Heading
            searchHandler={searchHandler}
            searchInputRef={searchInputRef}
          />
          <Carousel
            data={latestReviews}
            onCommentClick={commentClickHandler}
            homePage
            substringReview
          />
        </Stack>
      )}
    </>
  );
};

export default HomePage;
