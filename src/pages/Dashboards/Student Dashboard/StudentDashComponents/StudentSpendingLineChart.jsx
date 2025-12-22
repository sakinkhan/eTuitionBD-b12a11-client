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

const StudentSpendingLineChart = () => {
  const axiosSecure = useAxiosSecure();

  const { data = [], isLoading } = useQuery({
    queryKey: ["student-payments-for-chart"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments", {
        params: { limit: 100 },
      });

      const payments = res.data?.payments || [];

      const grouped = payments.reduce((acc, payment) => {
        const d = new Date(payment.paidAt);

        const sortKey = d.toLocaleDateString("en-CA");
        const label = d.toLocaleDateString("en-GB").replace(/\//g, "-");

        if (!acc[sortKey]) {
          acc[sortKey] = { date: label, amount: 0 };
        }

        acc[sortKey].amount += payment.amount || 0;
        return acc;
      }, {});

      return Object.entries(grouped)
        .sort(([a], [b]) => new Date(a) - new Date(b))
        .map(([, value]) => value);
    },
  });

  if (isLoading) return <LoadingLottie />;

  if (data.length === 0) {
    return (
      <div className="bg-base-100 rounded-xl p-6 shadow text-center text-gray-500">
        No payment data yet
      </div>
    );
  }

  return (
    <div className="bg-base-100 rounded-xl p-6 shadow-xl border border-primary h-full flex flex-col">
      {/* Header */}
      <h3 className="text-xl font-semibold mb-4 text-center">
        <span className="text-primary">Spending</span> Over Time
      </h3>

      {/* Chart area */}
      <div className="flex-1 min-h-[260px] lg:min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis tickFormatter={(v) => `৳${v}`} />
            <Tooltip
              content={
                <CustomToolTip
                  labelMap={{ amount: "Spent" }}
                  valueFormatter={(value) => `৳${value}`}
                />
              }
            />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#ff7100"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StudentSpendingLineChart;
