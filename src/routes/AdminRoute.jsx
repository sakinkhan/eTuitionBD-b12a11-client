import React from "react";
import { Navigate } from "react-router";
import useCurrentUser from "../hooks/useCurrentUser";
import LoadingLottie from "../components/Lotties/LoadingLottie";

const AdminRoute = ({ children }) => {
  const { role, roleLoading } = useCurrentUser();

  if (roleLoading) return <LoadingLottie />;

  if (role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
