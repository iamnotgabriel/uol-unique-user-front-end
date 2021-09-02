import React from "react";

import { Route, Switch } from "react-router-dom";

import SignUp from "../pages/SignUp";
import Dashboard from "../pages/Dashboard";

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignUp} />
      <Route path="/dashboard" exact component={Dashboard} />
    </Switch>
  );
};

export default Routes;
