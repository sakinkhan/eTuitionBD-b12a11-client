import React from "react";
import { Navigate, useLocation } from "react-router";
import Loading from "../components/Loading";
import useAuth from "../hooks/useAuth";
import LoadingLottie from "../components/Lotties/LoadingLottie";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  const loation = useLocation();

  if (loading) {
    return <LoadingLottie></LoadingLottie>;
  }
  if (user && user?.email) {
    return children;
  }
  return <Navigate state={loation.pathname} to={"/login"}></Navigate>;
};

export default PrivateRoute;
