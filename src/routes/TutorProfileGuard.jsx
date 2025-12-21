import { Navigate, useLocation } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import LoadingLottie from "../components/Lotties/LoadingLottie";

const TutorProfileGuard = ({ children }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const location = useLocation();

  const { data: dbUser, isLoading } = useQuery({
    queryKey: ["dbUser", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data?.user ?? res.data;
    },
  });

  if (isLoading) {
    return <LoadingLottie />;
  }

  if (
    dbUser?.role === "tutor" &&
    !dbUser.profileCompleted &&
    location.pathname !== "/dashboard/tutor-profile-setup"
  ) {
    return <Navigate to="/dashboard/tutor-profile-setup" replace />;
  }

  return children;
};

export default TutorProfileGuard;
