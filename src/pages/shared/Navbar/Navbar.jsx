import React, { useContext } from "react";
import { Link } from "react-router";
import { toast } from "react-toastify";
import Logo from "../../../components/Logo/Logo";
import { BsMoonStarsFill, BsSunFill } from "react-icons/bs";
import MyLink from "../../../components/MyLink/MyLink";
import { ThemeContext } from "../../../contexts/ThemeContext/ThemeContext";
import useAuth from "../../../hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleLogout = () => {
    logOut()
      .then(() => toast.error("You have been logged out"))
      .catch((err) => console.log(err));
  };

  const publicLinks = (
    <>
      <MyLink to="/">Home</MyLink>
      <MyLink to="/tuitions">Tuitions</MyLink>
      <MyLink to="/tutors">Tutors</MyLink>
      <MyLink to="/about">About</MyLink>
      <MyLink to="/contact">Contact</MyLink>
    </>
  );

  const protectedLinks = user && (
    <>
      <MyLink to="/dashboard">Protected LINK</MyLink>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-md py-4 px-6 md:px-20 sticky top-0 z-50 transition-colors duration-300">
      {/* Left: Logo + Mobile Menu */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 shadow space-y-2"
          >
            {publicLinks}
            {protectedLinks}
          </ul>
        </div>
        <Logo />
      </div>

      {/* Center: Desktop Links */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-2">
          {publicLinks}
          {protectedLinks}
        </ul>
      </div>

      {/* Right: Theme toggle + User/Login */}
      <div className="navbar-end flex items-center gap-2">
        {/* Theme toggle */}
        <div
          className="tooltip tooltip-bottom tooltip-primary"
          data-tip="Change Theme"
        >
          <button
            className="btn btn-ghost btn-circle text-lg"
            onClick={toggleTheme}
          >
            {theme === "light" ? (
              <BsMoonStarsFill className="text-base-content" />
            ) : (
              <BsSunFill className="text-yellow-500" />
            )}
          </button>
        </div>

        {user ? (
          <div className="flex items-center gap-3">
            <Link
              to="/dashboard"
              className="btn btn-outline btn-primary rounded-full text-sm border-2"
            >
              My Dashboard
            </Link>
            <div className="dropdown dropdown-end">
              <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-12 rounded-full border-2 border-primary">
                  <img
                    src={
                      user.photoURL ||
                      "https://img.icons8.com/?size=48&id=kDoeg22e5jUY&format=png"
                    }
                    alt="User Avatar"
                  />
                </div>
              </div>
              <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 p-2 shadow space-y-2 min-w-48 max-w-[90vw]">
                <li>
                  <p className="font-semibold text-base-content text-sm wrap-break-word">
                    {user?.displayName}
                  </p>
                </li>
                <li>
                  <p className="text-xs text-base-content wrap-break-word">
                    {user?.email}
                  </p>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="btn btn-primary text-white text-sm rounded-full w-full"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <>
            <div className="hidden lg:flex gap-2">
              <Link
                to="/login"
                className="btn btn-outline btn-primary rounded-full text-sm border-2"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="btn btn-secondary rounded-full text-sm border-2 text-black"
              >
                Sign Up
              </Link>
            </div>
            {/* Mobile login/signup */}
            <div className="dropdown dropdown-end lg:hidden">
              <div tabIndex={0} className="btn btn-ghost btn-circle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 1115 0"
                  />
                </svg>
              </div>
              <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-40 shadow space-y-2">
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Sign Up</Link>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
