import React from "react";
import { Switch, Route, Redirect } from "react-router";
import Cart from "./Pages/Cart/Cart";
import Home from "./Pages/Home/Home";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/cart" component={Cart} />
      <Redirect from="*" to="/" />
    </Switch>
  );
};

export default Routes;
