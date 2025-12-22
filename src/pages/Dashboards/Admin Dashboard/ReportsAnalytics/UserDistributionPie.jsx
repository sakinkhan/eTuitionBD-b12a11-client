import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import CustomToolTip from "./CustomToolTip";

const COLORS = ["#facc15", "oklch(70% 0.2 220)", "#ff7100"]; // Students, Tutors, Admins

// Custom label renderer (inside slices)
const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, percent }) => {
  if (percent < 0.06) return null;

  const radius = outerRadius * 0.6;
  const x = cx + radius * Math.cos((-midAngle * Math.PI) / 180);
  const y = cy + radius * Math.sin((-midAngle * Math.PI) / 180);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={12}
      fontWeight={600}
    >
      {(percent * 100).toFixed(0)}%
    </text>
  );
};

const UserDistributionPie = ({ data = [] }) => {
  const totalUsers = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-base-100 border border-primary rounded-2xl p-5 shadow-lg h-[480px] min-h-0 flex flex-col">
      {/* Header */}
      <div className="mb-3">
        <h3 className="text-lg font-semibold text-base-content">
          <span className="text-primary">User</span> Distribution
        </h3>
        <p className="text-sm text-base-content/60">Breakdown by user roles</p>
      </div>

      {/* Chart */}
      <div className="h-[300px] w-full min-w-0 overflow-hidden ">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={110}
              dataKey="value"
              labelLine={false}
              label={renderCustomizedLabel}
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>

            <Tooltip
              content={
                <CustomToolTip
                  showLabel={true}
                  valueFormatter={(value) => [`${value} users`]}
                />
              }
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-4 text-sm">
        {data.map((item, i) => (
          <div key={item.name} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: COLORS[i] }}
            />
            <span className="text-base-content/70">{item.name}</span>
          </div>
        ))}
      </div>

      {/* Total users (matches ApplicationStatusDonut style) */}
      <div className="mt-2 text-center">
        <p className="text-xs text-base-content/60">Total Users</p>
        <p className="text-xl font-bold text-primary">{totalUsers}</p>
      </div>
    </div>
  );
};

export default UserDistributionPie;
