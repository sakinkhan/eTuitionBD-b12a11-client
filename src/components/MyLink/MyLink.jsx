import React from "react";
import { NavLink } from "react-router";

const MyLink = ({ to, className, children }) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `text-lg font-primary transition duration-200
           ${
             isActive
               ? "font-bold text-primary"
               : "font-normal text-base-content"
           }
           hover:font-bold hover:scale-105
           no-underline
           bg-transparent
           shadow-none
           p-1.5
           ${className || ""}`
        }
      >
        {children}
      </NavLink>
    </li>
  );
};

export default MyLink;
