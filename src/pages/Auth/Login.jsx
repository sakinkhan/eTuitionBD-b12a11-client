import React, { useState } from "react";
import { IoIosEyeOff, IoMdEye } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";

const Login = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { user, logInUser, loginWithGoogle } = useAuth();

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

  // Google Sign in
  const handleGoogleSignIn = () => {
    loginWithGoogle()
      .then(() => {
        toast.success("Signed in with Google successfully!");
        navigate(location.state ? location.state : "/");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Google sign-in failed. Please try again.");
      });
  };

  // Forget Password
  const handleForgetPassword = () => {
    const emailValue = getValues("email")?.trim();
    if (!emailValue) {
      toast.error("Please enter your email first.");
      return;
    }
    navigate("/forget-password", { state: { email: emailValue } });
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
              onClick={handleForgetPassword}
              className="text-[15px] text-primary hover:underline mb-2 cursor-pointer text-left"
            >
              Forgot password?
            </button>
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
                to="/register"
                className="text-primary :text-blue-400 hover:underline"
              >
                Register
              </Link>
            </p>

            {/* Google */}
            <div className="border-t border-base-content/20 pt-5">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                aria-label="Login with Google"
                className="btn w-full flex items-center justify-center gap-2 
               text-base-content text-[16px] bg-base-100 border border-base-content/20 
               rounded-full hover:bg-base-200 transition-colors duration-200 hover:scale-[1.02]"
              >
                <svg
                  aria-label="Google logo"
                  width="16"
                  height="16"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <g>
                    <path d="m0 0H512V512H0" fill="none"></path>
                    <path
                      fill="#34a853"
                      d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                    ></path>
                    <path
                      fill="#4285f4"
                      d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                    ></path>
                    <path
                      fill="#fbbc02"
                      d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                    ></path>
                    <path
                      fill="#ea4335"
                      d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                    ></path>
                  </g>
                </svg>
                Login with Google
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Login;
