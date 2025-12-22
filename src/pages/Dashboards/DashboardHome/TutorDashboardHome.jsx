import React from "react";
import useAuth from "../../../hooks/useAuth";
import TutorKpiCard from "../Tutor Dashboard/TutorDashComponents/TutorKpiCard";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingLottie from "../../../components/Lotties/LoadingLottie";
import TutorRevenueLineChart from "../Tutor Dashboard/TutorDashComponents/TutorRevenueLineChart";

const TutorDashboardHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["tutor-dashboard-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tutor/dashboard-stats");
      return res.data;
    },
  });

  console.log(stats);

  const { netEarnings = 0, ongoingTuitions = 0, totalApplications = 0 } = stats;

  if (isLoading) return <LoadingLottie />;
  return (
    <div className="p-5">
      <h2 className="text-2xl md:text-3xl font-bold text-center pt-5 pb-10">
        Welcome to your Dashboard, <br />
        <span className="text-primary">{user.displayName}!</span>
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Quick Stats */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 gap-4">
            <TutorKpiCard
              title="Total Applications"
              value={totalApplications}
              subtext="All my applications"
            />

            <TutorKpiCard
              title="Total Earnings"
              value={netEarnings}
              prefix="৳"
              subtext="All completed payments"
            />

            <TutorKpiCard
              title="Active Tuitions"
              value={ongoingTuitions}
              subtext="Currently teaching"
            />
          </div>
        </div>

        {/* Revenue Chart  */}
        <div className="lg:col-span-9">
          <TutorRevenueLineChart />
        </div>
      </div>
    </div>
  );
};

export default TutorDashboardHome;
