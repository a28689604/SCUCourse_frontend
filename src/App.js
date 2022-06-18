import React, { useState, useCallback, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import HomePage from "./homePage/pages/HomePage";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import Teacher from "./teacher/pages/Teacher";
import Auth from "./user/pages/Auth";
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";
import SetPasssword from "./user/pages/SetPassword";

const App = () => {
  const { token, login, logout, userId } = useAuth();

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <HomePage />
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
        <Route path="/teacher/:teacherId" exact>
          <Teacher />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Route path="/setPassword/:setPasswordToken" exact>
          <SetPasssword />
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
        <>{routes}</>
      </Router>
    </AuthContext.Provider>
  );
};
export default App;
