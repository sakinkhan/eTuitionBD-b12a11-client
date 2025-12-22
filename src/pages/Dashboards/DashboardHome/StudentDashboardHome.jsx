import React from "react";
import useAuth from "../../../hooks/useAuth";
import StudentKpiCard from "../Student Dashboard/StudentDashComponents/StudentKpiCard";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingLottie from "../../../components/Lotties/LoadingLottie";
import StudentSpendingLineChart from "../Student Dashboard/StudentDashComponents/StudentSpendingLineChart";

const StudentDashboardHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["student-dashboard-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/student/dashboard-stats");
      return res.data;
    },
  });

  const {
    totalTuitions = 0,
    activeTuitions = 0,
    totalApplications = 0,
    totalPaid = 0,
  } = stats;

  if (isLoading) return <LoadingLottie />;

  return (
    <div className="p-5">
      <h2 className="text-2xl md:text-3xl font-bold text-center pt-5 pb-10">
        Welcome to your Dashboard, <br />
        <span className="text-primary">{user.displayName}!</span>
      </h2>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Quick Stats – 1/4 */}
        <div className="lg:col-span-3 h-full">
          <div className="grid grid-cols-1 gap-4 h-full">
            <StudentKpiCard
              title="Total Tuitions"
              value={totalTuitions}
              subtext="All posted tuition posts"
            />

            <StudentKpiCard
              title="Active Tuitions"
              value={activeTuitions}
              subtext="Currently ongoing"
            />

            <StudentKpiCard
              title="Tutor Applications"
              value={totalApplications}
              subtext="Received so far"
            />

            <StudentKpiCard
              title="Total Spent"
              value={totalPaid}
              prefix="৳"
              subtext="Successful payments"
            />
          </div>
        </div>

        {/* Spending Chart – 3/4 */}
        <div className="lg:col-span-9 flex">
          <div className="flex-1">
            <StudentSpendingLineChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboardHome;
