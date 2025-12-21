import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import LoadingLottie from "../components/Lotties/LoadingLottie";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingLottie />;
  }

  if (!user) {
    return (
      <Navigate to="/auth/login" replace state={{ from: location.pathname }} />
    );
  }

  return children;
};

export default PrivateRoute;
