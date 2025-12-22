import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import LoadingLottie from "../../../../components/Lotties/LoadingLottie";
import RevenueTrendChart from "./RevenueTrendChart";
import AdminKpiCard from "../AdminDashComponents/AdminKpiCard";
import AdminTransactionTable from "./AdminTransactionTable";
import ApplicationStatusDonut from "./ApplicationStatusDonut";
import UserDistributionPie from "./UserDistributionPie";

const dateRanges = [
  { label: "Today", value: "today" },
  { label: "Last 7 days", value: "last_7_days" },
  { label: "Last 30 days", value: "last_30_days" },
];

const rangeLabelMap = {
  today: "Today",
  last_7_days: "Last 7 days",
  last_30_days: "Last 30 days",
};

const ReportsAnalytics = () => {
  const axiosSecure = useAxiosSecure();
  const [dateRange, setDateRange] = useState("last_7_days");

  const rangeLabel = rangeLabelMap[dateRange] || "Selected period";
  //  Revenue query
  const { data, isLoading } = useQuery({
    queryKey: ["admin-revenue-summary", dateRange],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/admin/analytics/revenue-summary?range=${dateRange}`
      );
      return res.data;
    },
  });
  //  Users query
  const { data: usersData = [], isLoading: usersLoading } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data?.users || [];
    },
  });

  if (isLoading || usersLoading) return <LoadingLottie />;

  const userDistribution = (() => {
    let students = 0;
    let tutors = 0;
    let admins = 0;

    usersData.forEach((user) => {
      if (user.role === "student") students++;
      else if (user.role === "tutor") tutors++;
      else if (user.role === "admin") admins++;
    });

    return [
      { name: "Students", value: students },
      { name: "Tutors", value: tutors },
      { name: "Admins", value: admins },
    ];
  })();
  const totals = data?.totals || {};
  const chartData = data?.data || [];

  return (
    <div className="p-5">
      {/* ---------------- Header ---------------- */}
      <div className="flex flex-col items-center gap-5">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold pt-5 pb-2">
            Reports & <span className="text-primary">Analytics</span>
          </h2>
          <p className="text-md font-medium text-base-content/60">
            Platform revenue and transaction history
          </p>
        </div>

        {/* Date range buttons */}
        <div className="flex items-center gap-2">
          {dateRanges.map(({ label, value }) => {
            const isActive = dateRange === value;

            return (
              <button
                key={value}
                onClick={() => setDateRange(value)}
                className={`px-3 py-1.5 text-sm font-medium border transition
                  ${
                    isActive
                      ? "btn btn-primary btn-sm rounded-full text-white border-primary"
                      : "btn btn-outline btn-sm btn-primary rounded-full"
                  }`}
              >
                {label}
              </button>
            );
          })}

          <button
            disabled
            className="px-3 py-1.5 rounded-lg text-sm font-medium border border-base-300 text-base-content/50 cursor-not-allowed"
          >
            Custom
          </button>
        </div>
      </div>

      {/* ---------------- Content ---------------- */}
      <div className="my-5 space-y-5">
        {/* KPI cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AdminKpiCard
            title="Platform Earnings"
            value={totals.platformRevenue ?? 0}
            prefix="৳"
            subtext={rangeLabel}
          />

          <AdminKpiCard
            title="Gross Transaction Volume"
            value={totals.grossRevenue ?? 0}
            prefix="৳"
            subtext={rangeLabel}
          />

          <AdminKpiCard
            title="Successful Payments"
            value={totals.paymentsCompleted ?? 0}
            subtext={rangeLabel}
          />
        </div>
        <div className="grid grid-cols-1 gap-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 min-w-0">
            <div>
              {/* Revenue trend */}
              <RevenueTrendChart
                data={chartData}
                dateRangeLabel={rangeLabelMap[dateRange] || "Selected period"}
              />
            </div>
            <div>
              {/* Application Status Donut */}
              <ApplicationStatusDonut
                approvedCount={totals.applicationsApproved}
                rejectedCount={totals.applicationsRejected}
              />
            </div>
            <div>
              {/* Users distribution pie */}
              <UserDistributionPie data={userDistribution} />
            </div>
          </div>
          <div className="min-w-0">
            {/* Transaction Summary */}
            <AdminTransactionTable dateRange={dateRange} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsAnalytics;
