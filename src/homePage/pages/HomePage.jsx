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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <ErrorModal error={error} onClear={clearError} />

      {!isLoading && latestReviews && (
        <>
          {/* Hero Section */}
          <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 py-20 sm:py-32">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
                }}
              ></div>
            </div>

            {/* Content */}
            <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-4xl text-center">
                <Heading
                  searchHandler={searchHandler}
                  searchInputRef={searchInputRef}
                />
              </div>
            </div>
          </section>

          {/* Latest Reviews Section */}
          <section className="py-20 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto mb-16 max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  最新評論
                </h2>
                <p className="mt-4 text-lg leading-8 text-gray-600">
                  查看其他同學對課程的最新評價和心得分享
                </p>
              </div>

              <div className="mx-auto max-w-6xl">
                <Carousel
                  data={latestReviews}
                  onCommentClick={commentClickHandler}
                  homePage
                  substringReview
                />
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="bg-white py-20 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto mb-16 max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  為什麼選擇我們？
                </h2>
                <p className="mt-4 text-lg leading-8 text-gray-600">
                  幫助學生做出更好的選課決定
                </p>
              </div>

              <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
                <div className="flex flex-col items-center rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 p-8 text-center">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white">
                    <svg
                      className="h-8 w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                      />
                    </svg>
                  </div>
                  <h3 className="mb-4 text-xl font-semibold text-gray-900">
                    豐富課程資料
                  </h3>
                  <p className="text-gray-600">
                    收錄 105-110 學年度完整課程成績分布，提供全面的選課參考資訊
                  </p>
                </div>

                <div className="flex flex-col items-center rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 p-8 text-center">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-600 text-white">
                    <svg
                      className="h-8 w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="mb-4 text-xl font-semibold text-gray-900">
                    真實學生評價
                  </h3>
                  <p className="text-gray-600">
                    來自真實學生的課程評價和心得，幫助你了解課程的實際狀況
                  </p>
                </div>

                <div className="flex flex-col items-center rounded-2xl bg-gradient-to-br from-purple-50 to-violet-50 p-8 text-center">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-purple-600 text-white">
                    <svg
                      className="h-8 w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                      />
                    </svg>
                  </div>
                  <h3 className="mb-4 text-xl font-semibold text-gray-900">
                    智能搜尋
                  </h3>
                  <p className="text-gray-600">
                    快速搜尋教授和課程，輕鬆找到你需要的選課資訊
                  </p>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default HomePage;
