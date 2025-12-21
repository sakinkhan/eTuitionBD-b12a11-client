import React from "react";

const PageSizeSelect = ({
  value,
  onChange,
  options = [5, 10, 20, 50],
  className = "",
}) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className={`ml-2 p-1 h-9 text-primary rounded-2xl
      focus:ring-1 focus:ring-primary focus:outline-none
      border border-gray-300 bg-base-100 ${className}`}
    >
      {options.map((n) => (
        <option key={n} value={n} className="bg-accent">
          {n}
        </option>
      ))}
    </select>
  );
};

export default PageSizeSelect;
