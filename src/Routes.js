import React from "react";
import { Switch, Redirect } from "react-router-dom";

import { RouteWithLayout, SecuredRouteWithLayout } from "./components";
import { Main as MainLayout, Minimal as MinimalLayout } from "./layouts";

import {
  Dashboard as DashboardView,
  SignIn as SignInView,
  NotFound as NotFoundView,
} from "./views";

const Routes = () => {
  const routes = (
    <Switch>
      <Redirect exact from="/" to="/dashboard" />
      <SecuredRouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/dashboard"
      />
      <RouteWithLayout
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/sign-in"
      />

      <SecuredRouteWithLayout
        component={NotFoundView}
        exact
        layout={MainLayout}
        path="/not-found"
      />
      <Redirect to="/not-found" />
    </Switch>
  );

  return routes;
};

export default Routes;
