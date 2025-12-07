import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { toast } from "react-toastify";
import Logo from "../../../components/Logo/Logo";
import { AuthContext } from "../../../contexts/AuthContext/AuthContext";
import { BsMoonStarsFill, BsSunFill } from "react-icons/bs";
import MyLink from "../../../components/MyLink/MyLink";

const Navbar = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const { user, logOut } = useContext(AuthContext);

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

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
      <MyLink to="/">My Dashboard</MyLink>
      <Mylink to="/myProperties">My Properties</Mylink>
      <MyLink to="/myRatings">My Ratings</MyLink>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-lg py-4 pr-4 md:px-20 sticky top-0 z-50">
      {/* Left: Logo + Dropdown Menu */}
      <div className="navbar-start">
        {/* Mobile Menu */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 shadow space-y-2 font-primary"
          >
            {publicLinks}
            {protectedLinks}
          </ul>
        </div>

        {/* Logo */}
        <div className="flex items-center gap-1">
          <Logo></Logo>
        </div>
      </div>

      {/* Center: Navigation (desktop only) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-1 font-primary">
          {publicLinks}
          {protectedLinks}
        </ul>
      </div>

      {/* Right: Theme, Login/Signup or Profile */}
      <div className="navbar-end flex items-center gap-2">
        {/* Theme toggle (visible everywhere) */}
        <div className="tooltip tooltip-bottom" data-tip="Change Theme">
          <button
            onClick={toggleTheme}
            className="btn btn-ghost btn-circle text-lg"
          >
            {theme === "light" ? (
              <BsMoonStarsFill className="text-gray-700" />
            ) : (
              <BsSunFill className="text-yellow-400" />
            )}
          </button>
        </div>

        {/* Logged-in user */}
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="User Avatar"
                  src={
                    user.photoURL ||
                    "https://img.icons8.com/?size=48&id=kDoeg22e5jUY&format=png"
                  }
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-48 p-2 shadow font-primary space-y-2"
            >
              <li>
                <p className="font-semibold text-sm">{user?.displayName}</p>
              </li>
              <li>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="btn btn-error text-white text-sm rounded-full"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <>
            {/* Desktop Buttons */}
            <div className="hidden lg:flex items-center gap-2">
              <Link
                to="/login"
                className="btn btn-outline btn-primary rounded-full  border-2 text-sm"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="btn btn-secondary text-black rounded-full border-2 text-sm"
              >
                Sign Up
              </Link>
            </div>

            {/* Mobile Dropdown */}
            <div className="dropdown dropdown-end lg:hidden">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              >
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
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-40 shadow space-y-2"
              >
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
