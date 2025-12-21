import React from "react";
import useCurrentUser from "../hooks/useCurrentUser";
import { Navigate, useLocation } from "react-router";
import LoadingLottie from "../components/Lotties/LoadingLottie";

const TutorRoute = ({ children }) => {
  const { role, profileCompleted, roleLoading } = useCurrentUser();
  const location = useLocation();
  if (roleLoading) return <LoadingLottie />;

  if (role !== "tutor") {
    return <Navigate to="/" replace />;
  }
  // Tutor but profile not completed
  if (
    role === "tutor" &&
    profileCompleted === false &&
    !location.pathname.startsWith("/dashboard/tutor-profile-setup")
  ) {
    return <Navigate to="/dashboard/tutor-profile-setup" replace />;
  }

  return children;
};

export default TutorRoute;
