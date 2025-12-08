import React from "react";
import { FaLocationArrow } from "react-icons/fa";
import { Link } from "react-router";

const PrimaryButton = ({ to = "/", label = "Click Here" }) => {
  return (
    <div>
      <Link
        to={to}
        className="px-8 py-3 rounded-full text-white font-semibold text-lg bg-primary hover:bg-secondary hover:text-gray-900 transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95"
      >
        {label}
      </Link>
    </div>
  );
};

export default PrimaryButton;
