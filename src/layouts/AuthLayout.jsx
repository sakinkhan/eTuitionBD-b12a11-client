import React from "react";
import Logo from "../components/Logo/Logo";
import { Outlet } from "react-router";
import WelcomeLottie from "../components/Lotties/WelcomeLottie";

const AuthLayout = () => {
  return (
    <div>
      <Logo></Logo>
      <div className="flex">
        <dev className="left">
          <WelcomeLottie></WelcomeLottie>
        </dev>
        <div className="right">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
