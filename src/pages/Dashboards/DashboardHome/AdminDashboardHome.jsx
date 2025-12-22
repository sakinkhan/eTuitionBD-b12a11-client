import React from "react";
import TodayRevenueChart from "../Admin Dashboard/AdminDashComponents/TodayRevenueChart";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingLottie from "../../../components/Lotties/LoadingLottie";
import AdminKpiCard from "../Admin Dashboard/AdminDashComponents/AdminKpiCard";

const AdminDashboardHome = () => {
  const axiosSecure = useAxiosSecure();

  //  Fetch Revenue data
  const { data: revenueData, isLoading: revenueLoading } = useQuery({
    queryKey: ["admin-revenue-summary"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/analytics/revenue-summary");
      return res.data;
    },
  });

  // fetch pending post/tutor data
  const { data: pendingData, isLoading: pendingLoading } = useQuery({
    queryKey: ["admin-pending-summary"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/analytics/pending-summary");
      return res.data;
    },
  });

  if (revenueLoading || pendingLoading) return <LoadingLottie />;

  console.log("revenueData", revenueData);
  console.log("pendingData", pendingData);

  const paymentsCount = revenueData?.totals?.paymentsCompleted ?? 0;
  const revTotals = revenueData?.totals || {};
  const grossRevenue = revTotals.grossRevenue ?? 0;
  const platformRevenue = revTotals.platformRevenue ?? 0;

  return (
    <div className="p-5 space-y-5">
      <h2 className="text-2xl md:text-3xl font-bold text-center py-5">
        Welcome to <span className="text-primary">Admin Dashboard</span>
      </h2>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <AdminKpiCard
          title="Gross Revenue"
          value={`৳${grossRevenue.toLocaleString()}`}
          subtext="Last 7 days"
        />

        <AdminKpiCard
          title="Platform Earnings"
          value={`৳${platformRevenue.toLocaleString()}`}
          subtext="Last 7 days"
        />

        <AdminKpiCard
          title="Payments Completed"
          value={paymentsCount}
          subtext="Last 7 days"
        />

        <AdminKpiCard
          title="Pending Approvals"
          value={pendingData?.totals?.totalPending ?? 0}
          subtext="Requires attention"
        />
      </div>

      {/* Revenue Chart */}
      {revenueData?.data?.length > 0 ? (
        <TodayRevenueChart data={revenueData.data} />
      ) : (
        <div className="bg-base-100 border border-base-300 rounded-2xl p-6 text-center text-base-content/60">
          No revenue recorded in the last 7 days
        </div>
      )}
    </div>
  );
};

export default AdminDashboardHome;
