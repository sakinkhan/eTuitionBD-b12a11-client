import React from "react";
import logoImg from "../../assets/logo-icon.png";
import { Link } from "react-router";

const Logo = () => {
  return (
    <Link>
      <div className="flex items-center gap-2">
        <img src={logoImg} alt="Logo image" className="w-10" />
        <p className="text-2xl font-bold" style={{ color: "#ff7100" }}>
          eTuition<span style={{ color: "#f8e152" }}>BD</span>
        </p>
      </div>
    </Link>
  );
};

export default Logo;
