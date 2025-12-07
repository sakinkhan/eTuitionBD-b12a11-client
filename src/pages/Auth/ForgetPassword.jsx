import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";

const ForgotPassword = ({ isOpen, onClose, defaultEmail = "" }) => {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();
  const modalRef = useRef();

  useEffect(() => {
    if (isOpen) {
      reset({ email: defaultEmail });
    }
  }, [isOpen, defaultEmail, reset]);

  const handleResetPassword = async (data) => {
    try {
      setLoading(true);
      await resetPassword(data.email);
      toast.success("Password reset email sent!");
      reset();
      onClose();
    } catch (err) {
      toast.error(err.message || "Failed to send reset email");
    } finally {
      setLoading(false);
    }
  };

  // Close modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Close when clicking outside modal
  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={handleClickOutside}
    >
      <div ref={modalRef} className="bg-white rounded-xl p-6 w-full max-w-md">
        <h3 className="text-xl font-bold mb-4">Reset Your Password</h3>
        <form onSubmit={handleSubmit(handleResetPassword)}>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="input input-bordered w-full rounded-full mb-4"
            placeholder="Enter your email"
          />
          <div className="flex justify-center gap-2">
            <button
              type="submit"
              className="btn btn-primary rounded-full"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Reset Email"}
            </button>
            <button
              type="button"
              className="btn btn-outline rounded-full"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
