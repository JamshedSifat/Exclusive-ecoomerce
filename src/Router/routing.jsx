import { createBrowserRouter } from "react-router";
import MainLayouts from "../Layouts/MainLayouts/MainLayouts";
import Home from "../Pages/Home/Home";
import AuthLayouts from "../Layouts/AuthLayouts/AuthLayouts";
import Login from "../Auth/Login/Login";
import Register from "../Auth/Register/Register";
import MyProfile from "../Auth/Profile/MyProfile";
import MyOrders from "../Auth/Orders/MyOrders";


import CartItems from "../Pages/Cart/CartItems";
import Category from "../Components/categories/category";
import CheckOut from "../Pages/Cart/CheckOut/CheckOut";
import placeOrder from "../Pages/Cart/CheckOut/placeOrder";
import Contact from "../Pages/Contact/contact";


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
        Component:Contact,
      },
      {
        path: "profile",
        Component: MyProfile,
      },
      {
        path: "orders",
        Component:MyOrders,
      },
      {
        path: "cart",
        Component: CartItems,
      },
      {
        path:'checkout',
        Component:CheckOut
      },
      {
  path: "place-order",
  Component: placeOrder,
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
      
      
      
    ],
  },
]);