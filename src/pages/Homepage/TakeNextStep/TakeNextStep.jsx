import React from "react";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useCurrentUser from "../../../hooks/useCurrentUser";
import { toast } from "react-toastify";

const TakeNextStep = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user: firebaseUser } = useAuth();
  const { role } = useCurrentUser() || {};
  const handlePostTuition = () => {
    // If not logged in, redirect to login
    if (!firebaseUser) {
      navigate("/auth/login", { state: { from: location.pathname } });
      return;
    }

    // If logged in as student, allow to post tuition
    if (role === "student") {
      navigate("/dashboard/post-tuitions");
      return;
    }

    // If logged in as tutor or admin, show error
    if (role === "tutor" || role === "admin") {
      toast.error("Oops, you have to login as a Student to post a tuition");
      return;
    }
  };
  return (
    <div className="bg-linear-to from-base-200 to-base-400 py-20">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-base-content mb-3">
          Take the Next <span className="text-primary">Next</span> Step
        </h2>
      </div>
      {/* CTA */}
      <div className="text-center mt-12 sm:mt-16">
        <p className="text-base-content/70 mb-4">
          Find verified tutors or post a tuition in minutes — simple, secure,
          and transparent.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/tutors"
            className="px-8 py-3 rounded-full font-semibold
              bg-primary text-white hover:bg-secondary hover:text-black cursor-pointer transition"
          >
            Find a Tutor
          </Link>
          <button
            onClick={handlePostTuition}
            className="px-8 py-3 rounded-full font-semibold
              bg-secondary text-black hover:bg-primary hover:text-white cursor-pointer transition"
          >
            Post a Tuition
          </button>
        </div>
      </div>
    </div>
  );
};

export default TakeNextStep;
