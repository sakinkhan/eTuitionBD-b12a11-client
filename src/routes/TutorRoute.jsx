import React from "react";
import useRole from "../hooks/useRole";
import { Navigate, useLocation } from "react-router";

const TutorRoute = ({ children }) => {
  const { role, roleLoading } = useRole();
  const location = useLocation();
  if (roleLoading) return null;

  if (role !== "tutor") {
    return (
      <Navigate to="/dashboard" replace state={{ from: location }}></Navigate>
    );
  }

  return children;
};

export default TutorRoute;
