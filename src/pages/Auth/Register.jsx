import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { IoIosEyeOff, IoMdEye } from "react-icons/io";

const Register = () => {
  const { registerUser, loginWithGoogle, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // Email & Password Registration
  const handleRegistration = async (data) => {
    try {
      setLoading(true);
      const res = await registerUser(data.email, data.password);
      console.log("after email pass reg", res);
      toast.success("Account created successfully!");
      navigate("/");
    } catch (err) {
      toast.error(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  // Google Login
  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      await loginWithGoogle();
      toast.success("Signed in with Google successfully!");
      navigate(location.state || "/");
    } catch {
      toast.error("Google sign-in failed");
    } finally {
      setLoading(false);
    }
  };

 // If already logged in
  if (user) {
    return (
      <div className="flex items-center justify-center min-h-[70vh] text-center">
        <p className="text-4xl md:text-5xl font-bold text-primary">
          You are already logged in.
        </p>
      </div>
    );
  } 

  return (
    <div className="flex items-center justify-center md:w-120">
      <title>eTuitionBD - Register</title>
      <div className="card w-full max-w-md md:max-w-lg lg:max-w-xl shadow-2xl py-8 px-10 rounded-3xl border-2 bg-accent-content/70 border-primary">
        <h1 className="text-3xl font-bold text-primary">Create Account</h1>
        <p className="text-base-content">
          Fill in your details to get started.
        </p>

        <form
          onSubmit={handleSubmit(handleRegistration)}
          className="mt-6 font-secondary"
        >
          {/* Name */}
          <label className="label text-[16px] text-base-content" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            {...register("name", { required: "Name is required" })}
            type="text"
            className="input input-bordered w-full text-[16px] rounded-full"
            placeholder="Your Name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}

          {/* Email */}
          <label
            className="label text-[16px] text-base-content"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format",
              },
            })}
            type="email"
            className="input input-bordered w-full text-[16px] rounded-full"
            placeholder="Your Email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}

          {/* Password */}
          <label
            className="label text-[16px] text-base-content"
            htmlFor="password"
          >
            Password
          </label>

          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                minLength: { value: 8, message: "At least 8 characters" },
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/,
                  message: "Must include uppercase, lowercase, and a number",
                },
              })}
              className="input input-bordered w-full text-[16px] rounded-full pr-10"
              placeholder="Your Password"
            />

            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute z-10 right-3 top-1/2 -translate-y-1/2 text-base-content"
            >
              {showPassword ? <IoIosEyeOff size={20} /> : <IoMdEye size={20} />}
            </button>
          </div>

          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}

          {/* Terms */}
          <div className="flex items-center gap-2 mt-3">
            <input
              type="checkbox"
              id="terms"
              className="checkbox checkbox-primary"
              required
            />
            <label
              htmlFor="terms"
              className="text-[16px] text-primary cursor-pointer"
            >
              Accept Terms & Conditions
            </label>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            className={`btn w-full mt-5 border-0 text-[16px] rounded-full ${
              loading ? "opacity-60 cursor-not-allowed" : "hover:scale-[1.02]"
            } bg-primary text-black`}
          >
            {loading ? "Registering..." : "Register"}
          </button>

          {/* Login link */}
          <p className="py-3 text-center font-semibold text-[16px]">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Login
            </Link>
          </p>

          {/* Google */}
          <div className="border-t border-base-content/20 pt-5">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="btn w-full flex items-center justify-center gap-2 
                text-base-content text-[16px] bg-base-100 border border-base-content/20 
                rounded-full hover:bg-base-200 transition-all hover:scale-[1.02]"
            >
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                alt="Google"
                className="w-5 h-5"
              />
              Sign Up using Google
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
