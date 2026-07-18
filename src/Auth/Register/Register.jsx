import React, { useContext } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthProvider";


const Register = () => {
  const { registerUser, updateUserProfile, googleSignIn } =
    useContext(AuthContext);

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    const form = e.target;

    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    // Password Validation
    if (password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    registerUser(email, password)
      .then(() => {
        return updateUserProfile({
          displayName: name,
          photoURL: photo,
        });
      })
      .then(() => {
        alert("Registration Successful!");
        navigate("/");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleGoogleSignIn = () => {
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
      <h1 className="text-3xl font-bold text-center">Create Account</h1>

      <p className="text-center text-gray-500 mt-2 mb-8">
        Join us and start shopping today.
      </p>

      <form onSubmit={handleRegister} className="space-y-5">
        <div>
          <label className="label font-medium">Full Name</label>
          <input
            name="name"
            type="text"
            placeholder="Enter your full name"
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="label font-medium">Photo URL</label>
          <input
            name="photo"
            type="text"
            placeholder="Enter photo URL"
            className="input input-bordered w-full"
            required
          />
        </div>

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
          <label className="label font-medium">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Create a password"
            className="input input-bordered w-full"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-full h-12">
          Create Account
        </button>
      </form>

      <div className="divider">OR</div>

      <button
        onClick={handleGoogleSignIn}
        className="btn btn-outline w-full h-12"
      >
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