import React, { useState } from "react";
import { useLocation } from "react-router";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

const ForgetPassword = () => {
  const location = useLocation();
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState(location.state?.email || "");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    try {
      setLoading(true);
      await resetPassword(email); // this should call your auth backend / Firebase
      toast.success("Password reset email sent!");
    } catch (err) {
      toast.error(err.message || "Failed to send reset email");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <div className="card p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Reset Password</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="input input-bordered w-full rounded-full mb-4"
        />
        <button
          onClick={handleReset}
          disabled={loading}
          className={`btn w-full rounded-full ${
            loading ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Sending..." : "Send Reset Email"}
        </button>
      </div>
    </div>
  );
};

export default ForgetPassword;
