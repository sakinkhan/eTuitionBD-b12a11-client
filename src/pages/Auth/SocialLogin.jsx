import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { VscLoading } from "react-icons/vsc";

const SocialLogin = () => {
  const { loginWithGoogle } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      // 1. Sign in with Google
      const result = await loginWithGoogle();
      const { user } = result;
      console.log(user);

      // 2. Prepare user object
      const userToSave = {
        name: user.displayName,
        email: user.email,
        role: "student",
        isAdmin: false,
        verified: false,
        photoURL: user.photoURL,
        createdAt: new Date(),
      };

      // 3. Save user to backend
      await axiosSecure.post("/users", userToSave);

      // 4. Success + redirect
      toast.success("Signed in with Google successfully!");
      navigate(location.state || "/");
    } catch (error) {
      console.error("Google sign-in error:", error);
      toast.error("Google sign-in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border-t border-base-content/20 pt-5">
      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={loading}
        aria-label="Login with Google"
        className={`btn w-full flex items-center justify-center gap-2 
          text-base-content text-[16px] bg-base-100 border border-base-content/20 
          rounded-full hover:bg-base-200 transition-colors duration-200 hover:scale-[1.02]
          ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
      >
        {loading ? (
          <VscLoading className="animate-spin w-5 h-5" />
        ) : (
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
        )}
        <span>{loading ? "Signing in..." : "Login with Google"}</span>
      </button>
    </div>
  );
};

export default SocialLogin;
