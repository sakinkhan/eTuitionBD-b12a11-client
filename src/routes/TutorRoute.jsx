import React from "react";
import useRole from "../hooks/useRole";
import { Navigate, useLocation } from "react-router";
import LoadingLottie from "../components/Lotties/LoadingLottie";

const TutorRoute = ({ children }) => {
  const { role, profileCompleted, roleLoading } = useRole();
  const location = useLocation();
  if (roleLoading) return <LoadingLottie />;

  if (role !== "tutor") {
    return (
      <Navigate to="/dashboard" replace state={{ from: location }}></Navigate>
    );
  }
  // Tutor but profile not completed
  if (
    role === "tutor" &&
    profileCompleted === false &&
    location.pathname !== "/dashboard/tutor-profile-setup"
  ) {
    return <Navigate to="/dashboard/tutor-profile-setup" replace />;
  }

  return children;
};

export default TutorRoute;
