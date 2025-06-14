import "./index.css";

import { createTheme, ThemeProvider } from "@mui/material";
import Box from "@mui/material/Box";
import { getAnalytics, logEvent } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import React, { Suspense, useEffect, useMemo } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import Footer from "./shared/components/Footer/Footer";
import Navigation from "./shared/components/Navigation/Navigation";
import Loading from "./shared/components/UIElements/Loading";
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";
import TeacherSearch from "./teacher/pages/TeacherSearch";

// Firebase configuration - moved outside component to prevent re-initialization
const firebaseConfig = {
  apiKey: "AIzaSyAFPpMmAdRU_OMCxpBKmthb77BNU87r-Nc",
  authDomain: "scucourse-d4e68.firebaseapp.com",
  projectId: "scucourse-d4e68",
  storageBucket: "scucourse-d4e68.appspot.com",
  messagingSenderId: "369095327082",
  appId: "1:369095327082:web:63a6503dbc2fb03a487913",
  measurementId: "G-PQN1CQF4QG",
};

// Initialize Firebase once - outside component
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Memoize theme creation to prevent re-creation on every render
const theme = createTheme({
  typography: {
    fontFamily: ["Microsoft JhengHei", "sans-serif"].join(","),
  },
});

// Lazy load components
const HomePage = React.lazy(() => import("./homePage/pages/HomePage"));
const Teacher = React.lazy(() => import("./teacher/pages/Teacher"));
const Auth = React.lazy(() => import("./user/pages/Auth"));
const SetPassword = React.lazy(() => import("./user/pages/SetPassword"));

const App = () => {
  const { token, login, logout, userId } = useAuth();

  // Track page views only when route changes
  useEffect(() => {
    const handleRouteChange = () => {
      logEvent(analytics, "screen_view", {
        firebase_screen: window.location.pathname + window.location.search,
      });
    };

    // Track initial page load
    handleRouteChange();

    // Listen for route changes
    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;

    window.history.pushState = function (...args) {
      originalPushState.apply(window.history, args);
      handleRouteChange();
    };

    window.history.replaceState = function (...args) {
      originalReplaceState.apply(window.history, args);
      handleRouteChange();
    };

    window.addEventListener("popstate", handleRouteChange);

    return () => {
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, []);

  // Memoize routes to prevent unnecessary re-renders
  const routes = useMemo(() => {
    if (token) {
      return (
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/teacher/find/:teacherId" exact>
            <TeacherSearch />
          </Route>
          <Route path="/teacher/:teacherId" exact>
            <Teacher />
          </Route>
          <Redirect to="/" />
        </Switch>
      );
    } else {
      return (
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/teacher/find/:teacherId" exact>
            <TeacherSearch />
          </Route>
          <Route path="/teacher/:teacherId" exact>
            <Teacher />
          </Route>
          <Route path="/setPassword/:setPasswordToken" exact>
            <SetPassword />
          </Route>
          <Route path="/auth">
            <Auth />
          </Route>
          <Redirect to="/auth" />
        </Switch>
      );
    }
  }, [token]);

  // Memoize auth context value
  const authContextValue = useMemo(
    () => ({ isLoggedIn: !!token, token, userId, login, logout }),
    [token, userId, login, logout]
  );

  return (
    <ThemeProvider theme={theme}>
      <AuthContext.Provider value={authContextValue}>
        <Router>
          <Box className="flex min-h-screen flex-col">
            <Navigation />
            <main className="flex-1">
              <Suspense fallback={<Loading overlay />}>{routes}</Suspense>
            </main>
            <Footer />
          </Box>
        </Router>
      </AuthContext.Provider>
    </ThemeProvider>
  );
};

export default App;
