import React from "react";
import useRole from "../../../hooks/useRole";
import LoadingLottie from "../../../components/Lotties/LoadingLottie";
import StudentDashboardHome from "./StudentDashboardHome";
import TutorDashboardHome from "./TutorDashboardHome";
import AdminDashboardHome from "./AdminDashboardHome";

const DashboardHome = () => {
  const { role, roleLoading } = useRole();
  if (roleLoading) {
    return <LoadingLottie></LoadingLottie>;
  }
  if (role === "student") {
    return <StudentDashboardHome></StudentDashboardHome>;
  } else if (role === "tutor") {
    return <TutorDashboardHome></TutorDashboardHome>;
  } else if (role === "admin") {
    return <AdminDashboardHome></AdminDashboardHome>;
  }
};

export default DashboardHome;
