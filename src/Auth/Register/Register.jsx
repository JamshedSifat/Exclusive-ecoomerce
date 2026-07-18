import React from "react";
import { Link } from "react-router";

const Register = () => {
  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold text-center">Create Account</h1>
      <p className="text-center text-gray-500 mt-2 mb-8">
        Join us and start shopping today.
      </p>

      <form className="space-y-5">
        <div>
          <label className="label font-medium">Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="label font-medium">Photo URL</label>
          <input
            type="text"
            placeholder="Enter photo URL"
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="label font-medium">Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="label font-medium">Password</label>
          <input
            type="password"
            placeholder="Create a password"
            className="input input-bordered w-full"
          />
        </div>

        <button className="btn btn-primary w-full h-12 text-base">
          Create Account
        </button>
      </form>

      <div className="divider">OR</div>

      <button className="btn btn-outline w-full h-12">
        Continue with Google
      </button>

      <p className="text-center mt-6 text-sm">
        Already have an account?{" "}
        <Link
          to="/auth/login"
          className="text-primary font-semibold hover:underline"
        >
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default Register;