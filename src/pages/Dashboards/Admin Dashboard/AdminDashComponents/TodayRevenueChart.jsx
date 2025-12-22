import { useNavigate } from "react-router";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const TodayRevenueChart = ({ data = [] }) => {
  const navigate = useNavigate();

  // Prepare stacked data
  const chartData = data.map((item) => ({
    ...item,
    tutorEarning: Number((item.amount - item.platformFee).toFixed(2)),
  }));

  return (
    <div className="bg-base-100 rounded-2xl shadow-lg border border-primary p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold text-base-content">
            <span className="text-primary">Revenue</span> Breakdown
          </h2>
          {/* Inline legend */}
          <div className="flex items-center gap-4 mt-1 text-sm text-base-content/70">
            <div className="flex items-center gap-1">
              <span className="inline-block w-3 h-3 rounded-sm bg-[#e0c303]" />
              <span>Platform</span>
            </div>

            <div className="flex items-center gap-1">
              <span className="inline-block w-3 h-3 rounded-sm bg-[#ff7100]" />
              <span>Tutor</span>
            </div>
          </div>
          <p className="text-sm text-base-content/60">
            Last 7 days earnings distribution
          </p>
        </div>

        <button
          onClick={() => navigate("/dashboard/admin/reports-analytics")}
          className="text-sm text-primary font-medium hover:underline"
        >
          View reports →
        </button>
      </div>

      {/* Chart */}
      <div className="h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />

            <XAxis
              dataKey="date"
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />

            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              }}
              formatter={(value, name) => {
                if (name === "platformFee") {
                  return [`৳${value.toLocaleString()}`, "Platform Earnings"];
                }
                if (name === "tutorEarning") {
                  return [`৳${value.toLocaleString()}`, "Tutor Payout"];
                }
                return value;
              }}
            />

            {/* Platform earnings (bottom stack) */}
            <Bar
              dataKey="platformFee"
              stackId="revenue"
              fill="#e0c303"
              radius={[6, 6, 0, 0]}
            />

            {/* Tutor payout (top stack) */}
            <Bar
              dataKey="tutorEarning"
              stackId="revenue"
              fill="#ff7100"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TodayRevenueChart;
