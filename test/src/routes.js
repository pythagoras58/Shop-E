import React from "react";
import { Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProductDetail from "./components/ProductDetail";

export const BaseRouter = () => {
  return (
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route exact path="/product/:id" component={ProductDetail} />
    </div>
  );
};
