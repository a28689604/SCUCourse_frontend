const CommentContent = ({
  newComment,
  children,
  courseName,
  content,
  homePage,
}) => {
  return (
    <div className="space-y-3">
      {newComment && <>{children}</>}
      {!newComment && (
        <>
          <div
            className={` ${
              homePage
                ? "text-lg leading-tight font-semibold text-gray-900"
                : "border-b border-gray-200 pb-3 text-xl font-bold text-gray-900"
            } `}
          >
            {courseName}
          </div>
          <p
            className={` ${
              homePage
                ? "line-clamp-4 text-sm leading-relaxed text-gray-700"
                : "rounded-lg border-l-4 border-blue-300 bg-gray-50 p-4 text-base leading-relaxed whitespace-pre-wrap text-gray-800"
            } `}
          >
            {content}
          </p>
        </>
      )}
    </div>
  );
};

export default CommentContent;
