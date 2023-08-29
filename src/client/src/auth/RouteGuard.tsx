import { Outlet, useNavigate } from "@solidjs/router";
import { createEffect } from "solid-js";
import Header from "../components/Header";
import clerk from "./Auth";

const RouteGuard = () => {
  const navigate = useNavigate();

  createEffect(() => {
    if (!clerk.user) {
      navigate('/sign-in', {replace: true});
    }
  })

  return (
    <div>
      <Header/>
      <Outlet/>
    </div>
  )
}

export default RouteGuard;