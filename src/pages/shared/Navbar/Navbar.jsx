import React, { useContext } from "react";
import { Link, useLocation } from "react-router";
import { toast } from "react-toastify";
import Logo from "../../../components/Logo/Logo";
import { BsMoonStarsFill, BsSunFill } from "react-icons/bs";
import MyLink from "../../../components/MyLink/MyLink";
import { ThemeContext } from "../../../contexts/ThemeContext/ThemeContext";
import useAuth from "../../../hooks/useAuth";
import useCurrentUser from "../../../hooks/useCurrentUser";

const Navbar = () => {
  const { user: firebaseUser, logOut } = useAuth();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { name, photoURL, roleLoading } = useCurrentUser() || {};
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logOut();
      toast.info("You have been logged out");
    } catch (err) {
      console.error(err);
    }
  };

  const publicLinks = (
    <>
      <MyLink to="/">Home</MyLink>
      <MyLink to="/tuitions">Tuitions</MyLink>
      <MyLink to="/tutors">Tutors</MyLink>
      <MyLink to="/about">About Us</MyLink>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-md py-4 px-6 md:px-20 sticky top-0 z-50">
      {/* Left */}
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
          <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 shadow space-y-2">
            {publicLinks}
          </ul>
        </div>
        <Logo />
      </div>

      {/* Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-2">{publicLinks}</ul>
      </div>

      {/* Right */}
      <div className="navbar-end flex items-center gap-2">
        {/* Theme toggle */}
        <div
          className="lg:tooltip lg:tooltip-left tooltip-primary"
          data-tip="Change Theme"
        >
          <button
            className="btn btn-ghost btn-circle text-lg"
            onClick={toggleTheme}
          >
            {theme === "light" ? (
              <BsMoonStarsFill />
            ) : (
              <BsSunFill className="text-yellow-500" />
            )}
          </button>
        </div>

        {firebaseUser ? (
          <div className="flex items-center gap-3">
            {/* Desktop Dashboard */}
            <Link
              to="/dashboard"
              className="btn btn-outline btn-primary hover:text-white rounded-full text-sm border-2 hidden lg:inline-flex"
            >
              My Dashboard
            </Link>

            {/* User dropdown */}
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                aria-label="User menu"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full border-2 border-primary overflow-hidden">
                  {roleLoading ? (
                    <div className="w-full h-full bg-gray-200 animate-pulse" />
                  ) : (
                    <img
                      src={
                        photoURL ||
                        firebaseUser.photoURL ||
                        "https://img.icons8.com/?size=48&id=kDoeg22e5jUY&format=png"
                      }
                      alt={name || firebaseUser.displayName}
                    />
                  )}
                </div>
              </div>

              <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 p-2 shadow space-y-2 min-w-48">
                <li className="pointer-events-none text-center">
                  <p className="font-semibold text-sm">
                    {name || firebaseUser.displayName}
                  </p>
                  <p className="text-xs">{firebaseUser.email}</p>
                </li>

                {/* Mobile Dashboard */}
                <li className="lg:hidden">
                  <Link
                    to="/dashboard"
                    className="btn btn-outline btn-primary hover:text-white btn-sm w-full rounded-full"
                  >
                    My Dashboard
                  </Link>
                </li>

                <li>
                  <Link
                    to="/userProfile"
                    className="btn btn-outline btn-primary hover:text-white btn-sm w-full rounded-full"
                  >
                    Manage Profile
                  </Link>
                </li>

                <li>
                  <button
                    onClick={handleLogout}
                    className="btn btn-error btn-sm w-full rounded-full"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <>
            {/* Desktop auth */}
            <div className="hidden lg:flex gap-2">
              <Link
                to="/auth/login"
                state={{ from: location.pathname }}
                className="btn btn-outline btn-primary hover:text-white rounded-full text-sm border-2"
              >
                Login
              </Link>
              <Link
                to="/auth/register"
                state={{ from: location.pathname }}
                className="btn btn-secondary rounded-full text-sm border-2 text-gray-800 hover:bg-primary hover:text-white hover:border-primary"
              >
                Sign Up
              </Link>
            </div>

            {/* Mobile auth */}
            <div className="dropdown dropdown-end rounded-4xl lg:hidden">
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
                  <Link
                    to="/auth/login"
                    state={{ from: location.pathname }}
                    className="btn btn-outline btn-sm btn-primary hover:text-white rounded-full border-2"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/auth/register"
                    state={{ from: location.pathname }}
                    className="btn btn-secondary rounded-full btn-sm border-2 text-gray-800 hover:bg-primary hover:text-white hover:border-primary"
                  >
                    Sign Up
                  </Link>
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
