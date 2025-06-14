import ThumbDown from "../Icons/ThumbDown";
import ThumbUp from "../Icons/ThumbUp";

const CommentRating = ({
  personalRating,
  recommend,
  difficulty,
  newComment,
  thumb,
  thumbOnClick,
  children,
  homePage,
}) => {
  return (
    <div
      className={` ${
        homePage
          ? "flex w-full items-center justify-between"
          : personalRating
            ? "flex items-center space-x-4 border-b border-gray-200 pb-4"
            : "flex min-w-[100px] flex-col items-center space-y-4"
      } `}
    >
      {/* Recommendation Section */}
      <div
        className={` ${
          homePage
            ? "flex items-center space-x-2"
            : "flex flex-col items-center space-y-2"
        } `}
      >
        <span
          className={` ${
            homePage
              ? "text-sm font-medium text-gray-700"
              : "text-base font-semibold text-gray-900"
          } `}
        >
          推薦
        </span>
        <div
          className={` ${
            homePage
              ? "flex items-center"
              : "flex items-center justify-center rounded-full bg-gray-50 p-2"
          } `}
        >
          {newComment && (
            <>
              {thumb && (
                <button
                  onClick={thumbOnClick}
                  className="transition-transform hover:scale-110"
                >
                  <ThumbUp />
                </button>
              )}
              {!thumb && (
                <button
                  onClick={thumbOnClick}
                  className="transition-transform hover:scale-110"
                >
                  <ThumbDown />
                </button>
              )}
            </>
          )}
          {!newComment && (
            <>
              {recommend && <ThumbUp />}
              {!recommend && <ThumbDown />}
            </>
          )}
        </div>
      </div>

      {/* Difficulty Section */}
      <div
        className={` ${
          homePage
            ? "flex items-center space-x-2"
            : "flex flex-col items-center space-y-2"
        } `}
      >
        <span
          className={` ${
            homePage
              ? "text-sm font-medium text-gray-700"
              : "text-base font-semibold text-gray-900"
          } `}
        >
          難度
        </span>
        {newComment && <>{children}</>}
        {!newComment && (
          <div
            className={` ${
              homePage
                ? "flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-800"
                : "flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-800"
            } `}
          >
            {difficulty}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentRating;
