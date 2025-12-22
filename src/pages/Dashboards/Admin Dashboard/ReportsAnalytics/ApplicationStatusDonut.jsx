import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import CustomToolTip from "./CustomToolTip";

const ApplicationStatusDonut = ({ approvedCount = 0, rejectedCount = 0 }) => {
  const total = approvedCount + rejectedCount;

  const data = [
    { name: "approved", value: approvedCount, color: "#22c55e" },
    { name: "rejected", value: rejectedCount, color: "#ef4444" },
  ];

  if (total === 0) {
    return (
      <div className="h-[300px] flex items-center justify-center text-base-content/60">
        No application data available
      </div>
    );
  }

  return (
    <div className="bg-base-100 rounded-xl p-5 shadow-lg border border-primary h-[480px] min-h-0 flex flex-col">
      {/* Header */}
      <div className="mb-3">
        <h3 className="text-lg font-semibold text-base-content">
          Tutor <span className="text-primary">Application</span> Outcomes
        </h3>
        <p className="text-sm text-base-content/60">Breakdown by Application statuses</p>
      </div>

      <div className="h-[300px] w-full min-w-0 overflow-hidden">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>

            <Tooltip
              content={
                <CustomToolTip
                  labelMap={{ approved: "Approved", rejected: "Rejected" }}
                  showLabel={true}
                />
              }
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={(value) =>
                value.charAt(0).toUpperCase() + value.slice(1)
              }
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Center summary */}
      <div className="text-center mt-2">
        <p className="text-sm text-base-content/60">Total Applications</p>
        <p className="text-2xl font-bold text-primary">{total}</p>
      </div>
    </div>
  );
};

export default ApplicationStatusDonut;
