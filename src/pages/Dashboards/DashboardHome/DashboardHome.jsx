import React from "react";
import useCurrentUser from "../../../hooks/useCurrentUser";
import LoadingLottie from "../../../components/Lotties/LoadingLottie";
import StudentDashboardHome from "./StudentDashboardHome";
import TutorDashboardHome from "./TutorDashboardHome";
import AdminDashboardHome from "./AdminDashboardHome";

const DashboardHome = () => {
  const { role, isAdmin, roleLoading } = useCurrentUser();
  if (roleLoading) {
    return <LoadingLottie></LoadingLottie>;
  }

  if (isAdmin) {
    return <AdminDashboardHome></AdminDashboardHome>;
  } else if (role === "student") {
    return <StudentDashboardHome></StudentDashboardHome>;
  } else if (role === "tutor") {
    return <TutorDashboardHome></TutorDashboardHome>;
  }

  return <div className="p-10 text-center">Role not assigned</div>;
};

export default DashboardHome;
