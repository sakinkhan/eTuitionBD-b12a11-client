import React, { useState } from "react";
import { IoIosEyeOff, IoMdEye } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
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

  const { logInUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  /* -------------------- Email & Password Login -------------------- */
  const handleLogin = async (data) => {
    setLoading(true);

    try {
      await logInUser(data.email, data.password);

      toast.success("Logged in successfully");
      navigate(location.state?.from || "/", { replace: true });
    } catch (err) {
      console.error("Login error:", err);

      toast.error(
        err?.code === "auth/invalid-credential"
          ? "Invalid email or password"
          : "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center md:w-120">
      <title>eTuitionBD - Login</title>

      <div className="card w-full max-w-md md:max-w-lg lg:max-w-xl shadow-2xl py-8 px-10 rounded-3xl border-2 bg-accent/60 border-primary">
        <h1 className="text-3xl font-bold text-primary">Welcome Back!</h1>
        <p className="text-base-content">
          Sign in to your account and continue
        </p>

        <form
          onSubmit={handleSubmit(handleLogin)}
          className="mt-6 font-secondary"
        >
          <fieldset className="fieldset">
            {/* Email */}
            <label className="label text-[16px] text-base-content">Email</label>

            <input
              type="email"
              placeholder="Your Email"
              className="input input-bordered w-full text-[16px] rounded-full"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}

            {/* Password */}
            <label className="label text-[16px] text-base-content">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Your Password"
                className="input input-bordered w-full text-[16px] rounded-full pr-10"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "At least 8 characters",
                  },
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/,
                    message: "Must include uppercase, lowercase, and a number",
                  },
                })}
              />

              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content"
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

            {/* Forgot Password */}
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="text-[15px] text-primary hover:underline mb-2 text-left"
            >
              Forgot password?
            </button>

            <ForgotPassword
              isOpen={modalOpen}
              onClose={() => setModalOpen(false)}
              defaultEmail={emailValue}
            />

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`btn w-full mt-5 rounded-full border-0 text-[16px]
                ${
                  loading
                    ? "opacity-60 cursor-not-allowed"
                    : "hover:scale-[1.02]"
                }
                bg-primary hover:bg-secondary text-black`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            {/* Register */}
            <p className="py-3 text-center font-semibold text-[16px]">
              Don’t have an account?{" "}
              <Link
                to="/auth/register"
                state={{ from: location.state?.from }}
                className="text-primary hover:underline"
              >
                Register
              </Link>
            </p>

            {/* Social Login */}
            <SocialLogin />
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Login;
