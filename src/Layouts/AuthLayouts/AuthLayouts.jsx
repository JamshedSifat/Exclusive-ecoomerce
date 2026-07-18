import React from "react";
import { Outlet } from "react-router";

const AuthLayouts = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="w-full max-w-md bg-base-100 shadow-xl rounded-lg p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayouts;