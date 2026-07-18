import { createBrowserRouter } from "react-router";
import MainLayouts from "../Layouts/MainLayouts/MainLayouts";
import Home from "../Pages/Home/Home";
import AuthLayouts from "../Layouts/AuthLayouts/AuthLayouts";
import Login from "../Auth/Login/Login";
import Register from "../Auth/Register/Register";
import MyProfile from "../Auth/Profile/MyProfile";
import MyOrders from "../Auth/Orders/MyOrders";
import Contact from "../Pages/Contact/Contact"; // Fixed: Capitalized
import CartItems from "../Pages/Cart/CartItems";
import Category from "../Components/categories/category";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayouts,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "contact",
        Component: Contact,
      },
      {
        path: "cart",
        Component: CartItems,
      },
      {
        path: "category", 
        Component: Category,
      },
      
      {
        path: "category/:categoryId",
        Component: Category,
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
      {
        path: "profile",
        Component: MyProfile,
      },
      {
        path: "orders",
        Component: MyOrders,
      },
    ],
  },
]);