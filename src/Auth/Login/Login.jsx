import React, { useContext } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthProvider";


const Login = () => {
  const { signInUser, googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signInUser(email, password)
      .then(() => {
        alert("Login Successful!");
        navigate("/");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleGoogleLogin = () => {
    googleSignIn()
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold text-center">Welcome Back</h1>

      <p className="text-center text-gray-500 mt-2 mb-8">
        Sign in to continue shopping.
      </p>

      <form onSubmit={handleLogin} className="space-y-5">
        <div>
          <label className="label font-medium">Email Address</label>
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="font-medium">Password</label>

            <button
              type="button"
              className="text-sm text-primary hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            className="input input-bordered w-full"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-full h-12 text-base">
          Sign In
        </button>
      </form>

      <div className="divider">OR</div>

      <button
        onClick={handleGoogleLogin}
        className="btn btn-outline w-full h-12"
      >
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