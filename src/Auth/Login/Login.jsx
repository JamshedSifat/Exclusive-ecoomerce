import React from "react";
import { Link } from "react-router";

const Login = () => {
  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold text-center">Welcome Back</h1>
      <p className="text-center text-gray-500 mt-2 mb-8">
        Sign in to continue shopping.
      </p>

      <form className="space-y-5">
        <div>
          <label className="label font-medium">Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="font-medium">Password</label>
            <a href="#" className="text-sm text-primary hover:underline">
              Forgot Password?
            </a>
          </div>

          <input
            type="password"
            placeholder="Enter your password"
            className="input input-bordered w-full"
          />
        </div>

        <button className="btn btn-primary w-full h-12 text-base">
          Sign In
        </button>
      </form>

      <div className="divider">OR</div>

      <button className="btn btn-outline w-full h-12">
        Continue with Google
      </button>

      <p className="text-center mt-6 text-sm">
        Don't have an account?{" "}
        <Link
          to="/auth/register"
          className="text-primary font-semibold hover:underline"
        >
          Create Account
        </Link>
      </p>
    </div>
  );
};

export default Login;