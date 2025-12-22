import React from "react";
import useCurrentUser from "../../../hooks/useCurrentUser";
import LoadingLottie from "../../../components/Lotties/LoadingLottie";
import StudentDashboardHome from "./StudentDashboardHome";
import TutorDashboardHome from "./TutorDashboardHome";
import AdminDashboardHome from "./AdminDashboardHome";

const DashboardHome = () => {
  const { role, roleLoading } = useCurrentUser();

  if (roleLoading || !role) {
    return <LoadingLottie></LoadingLottie>;
  }

  if (role === "admin") {
    return <AdminDashboardHome></AdminDashboardHome>;
  } else if (role === "student") {
    return <StudentDashboardHome></StudentDashboardHome>;
  } else if (role === "tutor") {
    return <TutorDashboardHome></TutorDashboardHome>;
  }

  return (
    <div className="p-10 text-center">
      Your Dashboard is getting ready... please reload the page.
    </div>
  );
};

export default DashboardHome;
