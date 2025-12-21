import React from "react";
import { Navigate } from "react-router";
import useCurrentUser from "../hooks/useCurrentUser";
import LoadingLottie from "../components/Lotties/LoadingLottie";

const StudentRoute = ({ children }) => {
  const { role, roleLoading } = useCurrentUser();

  if (roleLoading) return <LoadingLottie />;

  if (role !== "student") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default StudentRoute;
