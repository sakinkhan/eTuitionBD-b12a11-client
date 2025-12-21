import { Navigate, useLocation } from "react-router";
import { useEffect, useRef } from "react";
import useAuth from "../hooks/useAuth";
import LoadingLottie from "../components/Lotties/LoadingLottie";
import { toast } from "react-toastify";

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const toastShownRef = useRef(false);

  useEffect(() => {
    if (user?.email && !location.state && !toastShownRef.current) {
      const isLogin = location.pathname.includes("login");
      const isRegister = location.pathname.includes("register");

      if (isLogin) {
        toast.info("You're already logged in");
      } else if (isRegister) {
        toast.info("You already have an account");
      }

      toastShownRef.current = true;
    }
  }, [user, location]);

  if (loading) return <LoadingLottie />;

  if (user?.email) {
    return <Navigate to={location.state?.from || "/"} replace />;
  }

  return children;
};

export default PublicRoute;
