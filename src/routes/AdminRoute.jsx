import React from "react";
import { Navigate } from "react-router";
import useCurrentUser from "../hooks/useCurrentUser";
import LoadingLottie from "../components/Lotties/LoadingLottie";

const AdminRoute = ({ children }) => {
  const { isAdmin, roleLoading } = useCurrentUser();

  if (roleLoading) return <LoadingLottie />;

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
