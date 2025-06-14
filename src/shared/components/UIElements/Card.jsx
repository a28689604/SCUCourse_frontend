import PropTypes from "prop-types";

const Card = ({ onClick, className, children }) => {
  const baseClasses = `rounded-lg border border-gray-200 bg-white shadow-md ${className || ""}`;

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={`${baseClasses} focus:ring-opacity-50 w-full cursor-pointer text-left focus:ring-2 focus:ring-blue-500 focus:outline-none`}
      >
        {children}
      </button>
    );
  }

  return <div className={baseClasses}>{children}</div>;
};

Card.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Card;
