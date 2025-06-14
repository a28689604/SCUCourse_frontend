import classes from "./Loading.module.css";

// Lightweight CSS-only loading spinner instead of heavy LeapFrog component
const Loading = props => {
  return (
    <div
      className={`${classes.loading} ${
        props.overlay ? classes.loadingOverlay : ""
      }`}
    >
      <div className={classes.spinner} />
    </div>
  );
};

export default Loading;
