// src/Router/routing.jsx
import { createBrowserRouter, Navigate } from "react-router";
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
import AdminLogin from "../Admin/AdminLogin/AdminLogin";
import AdminRoute from "../Context/AdminRoute";
import AdminDashboard from "../Admin/AdminDashboard/AdminDashboard";
import AdminLayouts from "../Layouts/AdminLayouts/AdminLayouts"; // Import AdminLayouts
import AddProducts from "../Admin/AdminProducts/AddProducts/AddProducts";
import ProductsList from "../Admin/AdminProducts/AddProducts/ProductsList";
import Products from "../Pages/Products/Products";
import ProductDetails from "../Pages/ProductDetails/ProductDetails";

// Import admin components (create these later)
// import AdminUsers from "../Admin/AdminUsers/AdminUsers";
// import AdminOrders from "../Admin/AdminOrders/AdminOrders";
// import AdminProducts from "../Admin/AdminProducts/AdminProducts";
// import AdminRevenue from "../Admin/AdminRevenue/AdminRevenue";
// import AdminSettings from "../Admin/AdminSettings/AdminSettings";

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
        path: "profile",
        Component: MyProfile,
      },
      {
        path: "orders",
        Component: MyOrders,
      },
      {
        path: "cart",
        Component: CartItems,
      },
      {
        path: "checkout",
        Component: CheckOut,
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
      {
  path: "products",
  Component: Products,
},
{
  path: "product/:id",
  Component: ProductDetails,
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
        path: "admin-login",
        Component: AdminLogin,
      },
    ],
  },
  // Admin routes with AdminLayouts
  {
    path: "/admin",
    element: <AdminRoute><AdminLayouts /></AdminRoute>,
    children: [
      {
        index: true,
        element: <Navigate to="/admin/dashboard" replace />,
      },
      {
        path: "dashboard",
        Component: AdminDashboard,
      },
      {
        path:"product",
        Component:ProductsList
      },
       {
      path: "products/add",
      Component: AddProducts,
    },
      // Add more admin routes here
      // {
      //   path: "users",
      //   Component: AdminUsers,
      // },
      // {
      //   path: "orders",
      //   Component: AdminOrders,
      // },
      // {
      //   path: "products",
      //   Component: AdminProducts,
      // },
      // {
      //   path: "revenue",
      //   Component: AdminRevenue,
      // },
      // {
      //   path: "settings",
      //   Component: AdminSettings,
      // },
      // Product sub-routes
      // {
      //   path: "products/add",
      //   Component: AddProduct,
      // },
      // {
      //   path: "products/edit/:id",
      //   Component: EditProduct,
      // },
      // {
      //   path: "products/categories",
      //   Component: ProductCategories,
      // },
      // Order sub-routes
      // {
      //   path: "orders/all",
      //   Component: AllOrders,
      // },
      // {
      //   path: "orders/pending",
      //   Component: PendingOrders,
      // },
      // {
      //   path: "orders/shipped",
      //   Component: ShippedOrders,
      // },
      // {
      //   path: "orders/delivered",
      //   Component: DeliveredOrders,
      // },
    ],
  },
  // Fallback route for 404
  {
    path: "*",
    element: (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-800 dark:text-white">404</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Page not found</p>
          <a href="/" className="btn btn-primary mt-4">Go Home</a>
        </div>
      </div>
    ),
  },
]);