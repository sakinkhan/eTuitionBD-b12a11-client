import React from "react";
import CountUp from "react-countup";

const TutorKpiCard = ({ title, value = 0, subtext, prefix = "" }) => {
  const numericValue =
    typeof value === "number"
      ? value
      : Number(String(value).replace(/[^\d.-]/g, ""));

  return (
    <div className="bg-linear-to-bl from-accent/90 via-accent/30 to-accent/90 border border-primary rounded-2xl p-5 shadow-lg">
      <p className="text-sm font-semibold text-base-content/60">{title}</p>

      <h3 className="text-3xl font-bold text-primary mt-1">
        <CountUp
          end={numericValue}
          duration={1.5}
          separator=","
          prefix={prefix}
          preserveValue
        />
      </h3>

      {subtext && <p className="text-xs text-[#bda403] mt-1">{subtext}</p>}
    </div>
  );
};

export default TutorKpiCard;
