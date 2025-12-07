import React from "react";
import Logo from "../components/Logo/Logo";
import { Outlet } from "react-router";
import WelcomeLottie from "../components/Lotties/WelcomeLottie";
import Navbar from "../pages/shared/Navbar/Navbar";
import Footer from "../pages/shared/Footer/Footer";

const AuthLayout = () => {
  return (
    <div className="min-h-screen">
      <Navbar></Navbar>
      <div className="flex flex-col lg:flex-row items-center justify-center gap-2 pb-5 py-5 md:gap-20 md:py-10">
        <dev className="left hidden lg:block">
          <WelcomeLottie></WelcomeLottie>
        </dev>
        <div className="right">
          <Outlet></Outlet>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default AuthLayout;
