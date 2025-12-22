import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import CustomToolTip from "./CustomToolTip";

const RevenueTrendChart = ({
  data = [],
  dateRangeLabel = "Selected period",
}) => {
  const chartData = data.map((item) => ({
    ...item,
    tutorEarning: Number((item.amount - item.platformFee).toFixed(2)),
  }));

  const RevenueTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null;

    return (
      <div className="bg-base-100 text-base-content rounded-lg px-3 py-2 shadow-md">
        {payload.map((item, index) => {
          let label = item.name;
          let value = item.value;

          if (item.name === "tutorEarning") {
            label = "Tutor";
            value = `৳${item.value}`;
          }

          if (item.name === "platformFee") {
            label = "Platform";
            value = `৳${item.value}`;
          }

          return (
            <p key={index} className="text-sm" style={{ color: item.color }}>
              {label}: {value}
            </p>
          );
        })}
      </div>
    );
  };

  return (
    <div className="bg-base-100 rounded-2xl shadow-lg border border-primary p-5 h-[480px] min-h-0 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 shrink-0">
        <div>
          <h2 className="text-lg font-semibold text-base-content">
            <span className="text-primary">Revenue</span> Trend
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

          <p className="text-sm text-base-content/60 mt-1">{dateRangeLabel}</p>
        </div>
      </div>

      {/* Chart */}
      {/* Chart */}
      <div className="flex-1 min-h-0 w-full overflow-hidden">
        {chartData.length > 0 && (
          <ResponsiveContainer width="100%" aspect={1.1}>
            <BarChart
              data={chartData}
              margin={{ left: 0, right: 0, top: 10, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />

              <XAxis
                dataKey="date"
                tick={{ fontSize: 11 }}
                height={50}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                content={
                  <CustomToolTip
                    labelMap={{
                      tutorEarning: "Tutor",
                      platformFee: "Platform",
                    }}
                    valueFormatter={(value) => `৳${value}`}
                  />
                }
              />

              <Bar dataKey="platformFee" stackId="revenue" fill="#e0c303" />
              <Bar dataKey="tutorEarning" stackId="revenue" fill="#ff7100" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default RevenueTrendChart;
