import React, { useState, useEffect } from "react";

const SearchBar = ({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
}) => {
  const [internalValue, setInternalValue] = useState(value || "");

  // Debounce internal input to avoid excessive parent updates
  useEffect(() => {
    const handler = setTimeout(() => onChange(internalValue), 300);
    return () => clearTimeout(handler);
  }, [internalValue, onChange]);

  return (
    <label
      className={`flex items-center w-full md:w-120 bg-accent/70 rounded-full px-3 py-2 shadow-sm ${className}`}
    >
      <svg
        className="h-4 w-4 text-primary mr-2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.3-4.3" />
      </svg>
      <input
        type="search"
        placeholder={placeholder}
        value={internalValue}
        onChange={(e) => setInternalValue(e.target.value)}
        className="grow bg-transparent outline-none text-base-content placeholder-base-content/60"
      />
    </label>
  );
};

export default SearchBar;
