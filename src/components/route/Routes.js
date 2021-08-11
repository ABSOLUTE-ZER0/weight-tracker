import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import CustomRoute from "./CustomRoute";


function Routes() {
  return (
    <Fragment>
      <Router>
        <Switch>
          <CustomRoute exact path='/' component={Home}></CustomRoute>
          <Route exact path='/signup' component={Signup}></Route>
          <Route exact path='/login' component={Login}></Route>
        </Switch>
      </Router>
    </Fragment>
  );
}

export default Routes;
