import { createBrowserRouter } from "react-router";
import MainLayouts from "../Layouts/MainLayouts/MainLayouts";
import Home from "../Pages/Home/Home";
import AuthLayouts from "../Layouts/AuthLayouts/AuthLayouts";
import Login from "../Auth/Login/Login";
import Register from "../Auth/Register/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayouts,
    children: [
      {
        index: true,
        Component: Home,
      },
    ],
  },
{
  path: "/auth",
  Component: AuthLayouts,
  children: [
    {
      index: true,
      Component: Login,
    },
    {
      path: "login",
      Component: Login,
    },
    {
      path: "register",
      Component: Register,
    },
  ],
}
]);