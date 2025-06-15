import PropTypes from "prop-types";

import Card from "../UIElements/Card";
import CommentContent from "./CommentContent";
import CommentOption from "./CommentOption";
import CommentRating from "./CommentRating";

const CommentItem = props => {
  const createAt = new Date(props.createAt).toLocaleDateString("zh-TW");
  const cardClickHandler = () => {
    return props.onCommentClick ? props.onCommentClick(props.teacherName) : "";
  };

  const commentContent = !props.content
    ? ""
    : props.content.length > 50
      ? props.content.substring(0, 50) + "..."
      : props.content;

  return (
    <Card
      className={`w-full ${
        props.homePage &&
        "mx-auto h-[280px] origin-center transform cursor-pointer transition-all duration-300 hover:scale-[1.01]"
      } ${props.type === "personal" ? "border-l-4 border-l-blue-500" : ""} overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl`}
      onClick={cardClickHandler}
    >
      {props.newComment && <div className="p-6">{props.children}</div>}
      {!props.newComment && (
        <div
          className={` ${
            props.homePage
              ? "flex h-full flex-col"
              : props.type === "personal"
                ? "grid grid-cols-[auto_1fr_auto] gap-4 p-6"
                : "flex flex-col gap-6 p-6"
          } `}
        >
          {/* Enhanced Rating Section for Teacher Page */}
          <div
            className={` ${
              props.homePage
                ? "flex items-center justify-between border-b border-gray-200 bg-gradient-to-r from-blue-100 to-indigo-100 px-4 py-3"
                : props.type === "personal"
                  ? "flex flex-col items-center"
                  : "flex items-center justify-between rounded-xl border border-gray-200 bg-gradient-to-r from-slate-50 to-gray-100 p-4"
            } `}
          >
            <CommentRating
              recommend={props.recommend}
              difficulty={props.difficulty}
              homePage={props.homePage}
              personalRating={props.type === "personal"}
            />
            {/* Date section moved to rating area for better visual balance on teacher page */}
            {!props.homePage && props.type !== "personal" && (
              <div className="flex items-center text-sm text-gray-500">
                <svg
                  className="mr-2 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z"
                  />
                </svg>
                {createAt}
              </div>
            )}
          </div>

          {/* Enhanced Content Section for Teacher Page */}
          <div
            className={` ${
              props.homePage
                ? "flex-1 overflow-hidden px-4 py-3"
                : "flex-1 space-y-3"
            } `}
          >
            {props.substringReview && (
              <CommentContent
                content={commentContent}
                courseName={props.courseName}
                homePage={props.homePage}
              />
            )}
            {!props.substringReview && (
              <CommentContent
                content={props.content}
                courseName={props.courseName}
                homePage={props.homePage}
              />
            )}
          </div>

          {/* Enhanced Options/Voting Section for Teacher Page */}
          {!props.homePage && props.type !== "personal" && (
            <div className="flex items-center justify-between rounded-lg border-t border-gray-100 bg-gray-50 p-4">
              <CommentOption
                createAt={createAt}
                upVotes={props.upVotes}
                downVotes={props.downVotes}
                userVotes={props.userVotes}
                id={props.id}
              />
            </div>
          )}

          {/* Personal comment section remains unchanged */}
          {!props.homePage && props.type === "personal" && (
            <div className="flex-shrink-0">
              <CommentOption
                createAt={createAt}
                upVotes={props.upVotes}
                downVotes={props.downVotes}
                userVotes={props.userVotes}
                id={props.id}
              />
            </div>
          )}

          {props.homePage && (
            <div className="mt-auto border-t border-gray-100 px-4 py-2">
              <div className="flex items-center justify-between">
                <span className="flex items-center text-xs text-gray-500">
                  <svg
                    className="mr-1 h-3 w-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z"
                    />
                  </svg>
                  {createAt}
                </span>
                <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-600">
                  點擊查看詳情
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </Card>
  );
};

CommentItem.propTypes = {
  homePage: PropTypes.bool,
  type: PropTypes.string,
  recommend: PropTypes.bool,
  difficulty: PropTypes.number,
  content: PropTypes.string,
  substringReview: PropTypes.bool,
  courseName: PropTypes.string,
  onCommentClick: PropTypes.func,
  newComment: PropTypes.bool,
  children: PropTypes.node,
  id: PropTypes.string,
  upVotes: PropTypes.number,
  downVotes: PropTypes.number,
  userVotes: PropTypes.number,
  createAt: PropTypes.string,
};

export default CommentItem;
