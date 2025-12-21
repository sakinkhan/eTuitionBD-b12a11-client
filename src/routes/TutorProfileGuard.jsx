import { Navigate, useLocation } from "react-router";
import useCurrentUser from "../hooks/useCurrentUser";
import LoadingLottie from "../components/Lotties/LoadingLottie";

const TutorProfileGuard = ({ children }) => {
  const location = useLocation();
  const { role, profileCompleted, roleLoading } = useCurrentUser();

  if (roleLoading) {
    return <LoadingLottie />;
  }

  if (
    role === "tutor" &&
    profileCompleted === false &&
    location.pathname !== "/dashboard/tutor-profile-setup"
  ) {
    return <Navigate to="/dashboard/tutor-profile-setup" replace />;
  }

  return children;
};

export default TutorProfileGuard;
