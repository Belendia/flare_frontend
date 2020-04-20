import React from "react";
import { Switch, Redirect } from "react-router-dom";

import { RouteWithLayout, SecuredRouteWithLayout } from "./components";
import { Main as MainLayout, Minimal as MinimalLayout } from "./layouts";

import {
  Dashboard as DashboardView,
  SignIn as SignInView,
  NotFound as NotFoundView,
  LanguageList as LanguageListView,
  LanguageAdd as LanguageAddView,
  LanguageEdit as LanguageEditView,
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
      <SecuredRouteWithLayout
        component={LanguageListView}
        exact
        layout={MainLayout}
        path="/language"
      />
      <SecuredRouteWithLayout
        component={LanguageAddView}
        exact
        layout={MainLayout}
        path="/language/add"
      />
      <SecuredRouteWithLayout
        component={LanguageEditView}
        exact
        layout={MainLayout}
        path="/language/edit/:id"
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
