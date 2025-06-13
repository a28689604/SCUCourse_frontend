import { LeapFrog } from "@uiball/loaders";

import classes from "./Loading.module.css";

const Loading = props => {
  return (
    <div
      className={`${classes.loading} ${
        props.overlay ? classes.loadingOverlay : ""
      }`}
    >
      <LeapFrog size={40} speed={2.5} color="black" />
    </div>
  );
};

export default Loading;
