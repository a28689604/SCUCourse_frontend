import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import HomePage from "./homePage/pages/HomePage";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import Teacher from "./teacher/pages/Teacher";

function App() {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/teacher/:teacherId" exact>
            <Teacher />
          </Route>
          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
  );
}
export default App;
