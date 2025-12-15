import React from "react";
import { Navigate, useLocation } from "react-router";
import useRole from "../hooks/useRole";

const StudentRoute = ({ children }) => {
  const { role, roleLoading } = useRole();
  const location = useLocation();
  if (roleLoading) return null;

  if (role !== "student") {
    return (
      <Navigate to="/dashboard" replace state={{ from: location }}></Navigate>
    );
  }

  return children;
};

export default StudentRoute;
