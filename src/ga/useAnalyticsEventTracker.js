import React from "react";
import ReactGA from "react-ga";

const useAnalyticsEventTracker = (category = "Blog category") => {
  const eventTracker = (action = "default action", label = "default label") => {
    ReactGA.event({ category, action, label });
  };
  return eventTracker;
};
export default useAnalyticsEventTracker;
