import React, { Suspense, useEffect } from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Navigation from "./shared/components/Navigation/Navigation";
import Loading from "./shared/components/UIElements/Loading";
// import HomePage from "./homePage/pages/HomePage";
// import Teacher from "./teacher/pages/Teacher";
// import Auth from "./user/pages/Auth";
// import SetPasssword from "./user/pages/SetPassword";
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";
import TeacherSearch from "./teacher/pages/TeacherSearch";

import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
import { createTheme, ThemeProvider } from "@mui/material";
import Container from "@mui/material/Container";

const theme = createTheme({
  typography: {
    fontFamily: ["Microsoft JhengHei", "sans-serif"].join(","),
  },
});

const HomePage = React.lazy(() => import("./homePage/pages/HomePage"));
const Teacher = React.lazy(() => import("./teacher/pages/Teacher"));
const Auth = React.lazy(() => import("./user/pages/Auth"));
const SetPasssword = React.lazy(() => import("./user/pages/SetPassword"));

const App = () => {
  const { token, login, logout, userId } = useAuth();

  // Import the functions you need from the SDKs you need
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyAFPpMmAdRU_OMCxpBKmthb77BNU87r-Nc",
    authDomain: "scucourse-d4e68.firebaseapp.com",
    projectId: "scucourse-d4e68",
    storageBucket: "scucourse-d4e68.appspot.com",
    messagingSenderId: "369095327082",
    appId: "1:369095327082:web:63a6503dbc2fb03a487913",
    measurementId: "G-PQN1CQF4QG",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  useEffect(() => {
    logEvent(analytics, "screen_view", {
      firebase_screen: window.location.pathname + window.location.search,
    });
  }, [analytics]);

  let routes;

  if (token) {
    routes = (
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
    routes = (
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
          <SetPasssword />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <AuthContext.Provider value={{ isLoggedIn: !!token, token, userId, login, logout }}>
        <Router>
          <Navigation />
          <Container maxWidth="xl">
            <Suspense fallback={<Loading overlay />}>{routes}</Suspense>
          </Container>
        </Router>
      </AuthContext.Provider>
    </ThemeProvider>
  );
};
export default App;
