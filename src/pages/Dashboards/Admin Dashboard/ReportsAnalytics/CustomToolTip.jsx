import React from "react";

const CustomToolTip = ({
  active,
  payload,
  labelMap = {},
  valueFormatter,
  label,
  showLabel = true,
}) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-base-100 text-base-content rounded-lg px-3 py-2 shadow-md">
      {/* Top label (X-axis value) */}
      {showLabel && (
        <p className="text-xs font-semibold text-base-content/70 mb-1">
          {label}
        </p>
      )}
      {payload.map((item, index) => {
        const label = labelMap[item.name] ?? item.name;

        const value = valueFormatter
          ? valueFormatter(item.value, item.name)
          : item.value;

        return (
          <p
            key={index}
            className="text-sm"
            style={{ color: item.payload?.color || item.color }}
          >
            {label}: {value}
          </p>
        );
      })}
    </div>
  );
};

export default CustomToolTip;
