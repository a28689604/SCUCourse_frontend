import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import Loading from "./shared/components/UIElements/Loading";
// import HomePage from "./homePage/pages/HomePage";
// import Teacher from "./teacher/pages/Teacher";
// import Auth from "./user/pages/Auth";
// import SetPasssword from "./user/pages/SetPassword";
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";
import TeacherSearch from "./teacher/pages/TeacherSearch";

const HomePage = React.lazy(() => import("./homePage/pages/HomePage"));
const Teacher = React.lazy(() => import("./teacher/pages/Teacher"));
const Auth = React.lazy(() => import("./user/pages/Auth"));
const SetPasssword = React.lazy(() => import("./user/pages/SetPassword"));

const App = () => {
  const { token, login, logout, userId } = useAuth();

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
    <AuthContext.Provider
      value={{ isLoggedIn: !!token, token, userId, login, logout }}
    >
      <Router>
        <MainNavigation />
        <Suspense
          fallback={
            <>
              <Loading overlay />
            </>
          }
        >
          {routes}
        </Suspense>
      </Router>
    </AuthContext.Provider>
  );
};
export default App;
