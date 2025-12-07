import React, { useState } from "react";
import { IoIosEyeOff, IoMdEye } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import ForgotPassword from "./ForgetPassword";
import SocialLogin from "./SocialLogin";

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const emailValue = watch("email");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logInUser } = useAuth();
  const location = useLocation();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  // Email & Password Login
  const handleLogin = async (data) => {
    try {
      setLoading(true);
      const result = await logInUser(data.email, data.password);
      console.log(result);
      toast.success("You have logged in Successfully");
      navigate("/");
    } catch (err) {
      toast.error(err.message || "Login failed");
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
      <title>eTuitionBD - Login</title>
      <div className="card w-full max-w-md md:max-w-lg lg:max-w-xl shadow-2xl py-8 px-10 transition-colors duration-300 rounded-3xl border-2 bg-accent/60 border-primary">
        <h1 className="text-3xl font-bold text-primary">Welcome Back!</h1>
        <p className="text-base-content">Sign in to your account and join us</p>

        <form
          onSubmit={handleSubmit(handleLogin)}
          className="mt-6 font-secondary"
        >
          <fieldset className="fieldset">
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
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
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
                {showPassword ? (
                  <IoIosEyeOff size={20} />
                ) : (
                  <IoMdEye size={20} />
                )}
              </button>
            </div>

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="text-[15px] text-primary hover:underline mb-2 cursor-pointer text-left"
            >
              Forgot password?
            </button>

            {/* Forgot Password Modal */}
            <ForgotPassword
              isOpen={modalOpen}
              onClose={() => setModalOpen(false)}
              defaultEmail={emailValue}
            />

            <button
              type="submit"
              disabled={loading}
              className={`btn w-full mt-5 border-0 text-[16px] transition-all duration-200 rounded-full 
              ${
                loading ? "opacity-60 cursor-not-allowed" : "hover:scale-[1.02]"
              } 
              bg-primary hover:bg-secondary text-black`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <p className="py-3 text-center font-semibold text-[16px]">
              Don't have an account? Please{" "}
              <Link
                state={location.state}
                to="/register"
                className="text-primary :text-blue-400 hover:underline"
              >
                Register
              </Link>
            </p>
            {/* Google login*/}
            <SocialLogin></SocialLogin>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Login;
