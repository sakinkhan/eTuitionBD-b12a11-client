import React from "react";
import useRole from "../hooks/useRole";
import { useLocation } from "react-router";

const AdminRoute = ({ children }) => {
  const { isAdmin, roleLoading } = useRole();
  const location = useLocation();
  if (roleLoading) return null;

  if (!isAdmin) {
    return (
      <Navigate to="/dashboard" replace state={{ from: location }}></Navigate>
    );
  }
  return children;
};

export default AdminRoute;
