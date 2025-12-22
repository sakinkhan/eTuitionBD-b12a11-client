import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import LoadingLottie from "../../../../components/Lotties/LoadingLottie";
import CustomToolTip from "../../Admin Dashboard/ReportsAnalytics/CustomToolTip";

const PLATFORM_FEE_RATE = 0.1; // 10%

const TutorRevenueLineChart = () => {
  const axiosSecure = useAxiosSecure();

  const { data = [], isLoading } = useQuery({
    queryKey: ["tutor-revenue-line-chart"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tutor/revenue", {
        params: { limit: 100 },
      });

      const records = res.data?.revenueRecords || [];

      // Group by local date with a sortable key
      const grouped = records.reduce((acc, payment) => {
        const d = new Date(payment.paidAt);

        // Sort key (safe): YYYY-MM-DD
        const sortKey = d.toLocaleDateString("en-CA");

        // Display label: DD-MM-YYYY
        const label = d.toLocaleDateString("en-GB").replace(/\//g, "-");

        const netAmount = Math.round(
          (payment.amount || 0) * (1 - PLATFORM_FEE_RATE)
        );

        if (!acc[sortKey]) {
          acc[sortKey] = { date: label, amount: 0 };
        }

        acc[sortKey].amount += netAmount;

        return acc;
      }, {});

      // Sort chronologically (oldest → newest)
      return Object.entries(grouped)
        .sort(([a], [b]) => new Date(a) - new Date(b))
        .map(([, value]) => value);
    },
  });

  if (isLoading) return <LoadingLottie />;

  if (data.length === 0) {
    return (
      <div className="bg-base-100 rounded-xl p-6 shadow text-center text-gray-500">
        No revenue data yet
      </div>
    );
  }

  return (
    <div className="bg-base-100 rounded-xl p-6 shadow-xl border border-primary">
      <h3 className="text-xl font-semibold mb-4 text-center">
        <span className="text-primary">Revenue</span> Over Time
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis tickFormatter={(v) => `৳${v}`} />
          <Tooltip
            content={
              <CustomToolTip
                labelMap={{ netEarnings: "Net Earnings" }}
                valueFormatter={(value) => `৳${value}`}
              />
            }
          />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#16a34a"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TutorRevenueLineChart;
