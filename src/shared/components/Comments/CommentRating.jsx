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
            : "flex items-center space-x-6"
      } `}
    >
      {/* Recommendation Section */}
      <div
        className={` ${
          homePage
            ? "flex items-center space-x-2"
            : personalRating
              ? "flex flex-col items-center space-y-2"
              : "flex items-center space-x-3"
        } `}
      >
        <span
          className={` ${
            homePage
              ? "text-sm font-medium text-gray-700"
              : personalRating
                ? "text-base font-semibold text-gray-900"
                : "text-sm font-semibold text-gray-700"
          } `}
        >
          推薦
        </span>
        <div
          className={` ${
            homePage
              ? "flex items-center"
              : personalRating
                ? "flex items-center justify-center rounded-full bg-gray-50 p-2"
                : "flex items-center justify-center rounded-lg p-2 transition-all duration-200"
          } ${
            !homePage && !personalRating && recommend
              ? "border border-green-200 bg-green-100"
              : !homePage && !personalRating && !recommend
                ? "border border-red-200 bg-red-100"
                : !homePage && !personalRating
                  ? "border border-gray-200 bg-gray-100"
                  : ""
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
              {recommend && <ThumbUp className="text-green-600" />}
              {!recommend && <ThumbDown className="text-red-600" />}
            </>
          )}
        </div>
      </div>

      {/* Difficulty Section */}
      <div
        className={` ${
          homePage
            ? "flex items-center space-x-2"
            : personalRating
              ? "flex flex-col items-center space-y-2"
              : "flex items-center space-x-3"
        } `}
      >
        <span
          className={` ${
            homePage
              ? "text-sm font-medium text-gray-700"
              : personalRating
                ? "text-base font-semibold text-gray-900"
                : "text-sm font-semibold text-gray-700"
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
                : personalRating
                  ? "flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-800"
                  : "flex h-10 w-10 items-center justify-center rounded-lg text-base font-bold transition-all duration-200"
            } ${
              !homePage && !personalRating
                ? difficulty >= 4
                  ? "border border-red-200 bg-red-100 text-red-700"
                  : difficulty >= 3
                    ? "border border-orange-200 bg-orange-100 text-orange-700"
                    : "border border-green-200 bg-green-100 text-green-700"
                : ""
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
