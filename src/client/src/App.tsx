import { Component } from 'solid-js';
import { Route, Routes } from "@solidjs/router";
import NotFound from "./404";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import RouteGuard from "./auth/RautGuard";
import Stripe from "./components/Stripe";

const App: Component = () => {
  return (
    <Routes>
      <Route path="/" component={Home}/>
      <Route path="/home" component={Home}/>
      <Route path="/sign-up" component={SignUp}/>
      <Route path="/sign-in" component={SignIn}/>
      <Route path="/" component={RouteGuard}>
        <Route path={"/dashboard"} component={Dashboard}/>
        <Route path={"/payment"} component={Stripe}/>
      </Route>
      <Route path="*" component={NotFound}/>
    </Routes>

  );
};

export default App;
