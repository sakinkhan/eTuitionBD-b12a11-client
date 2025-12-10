import React, { useContext } from "react";
import { FaChalkboardTeacher, FaHome } from "react-icons/fa";
import { LuNotebookPen } from "react-icons/lu";
import { Link, NavLink, Outlet } from "react-router";
import logoImg from "../assets/logo-icon.png";
import { VscSettingsGear } from "react-icons/vsc";
import { IoDocumentAttachOutline } from "react-icons/io5";
import { FaMoneyBillTrendUp, FaUsers, FaUsersGear } from "react-icons/fa6";
import { GiTeacher } from "react-icons/gi";
import {
  BsFillCreditCardFill,
  BsMoonStarsFill,
  BsSunFill,
} from "react-icons/bs";
import { ThemeContext } from "../contexts/ThemeContext/ThemeContext";
import useRole from "../hooks/useRole";
import { PiFlowArrowBold } from "react-icons/pi";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";

const DashboardLayout = () => {
  const { role, isAdmin } = useRole();
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            {/* Sidebar toggle icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
          <div className="px-4 text-primary font-bold text-xl">
            eTuitionBD <span className="text-base-content">Dashboard</span>
          </div>
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
        </nav>

        {/* Page content here */}
        <Outlet></Outlet>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-16 is-drawer-open:w-38">
          {/* Sidebar content here */}
          <ul className="menu w-full grow space-y-2">
            {/* List item */}
            {/* Logo */}
            <li>
              <Link
                to="/"
                className="is-drawer-close:tooltip tooltip-primary is-drawer-close:tooltip-right"
                data-tip="Homepage"
              >
                <div></div>
                <img
                  src={logoImg}
                  alt="logoImg"
                  className="w-20 is-drawer-open:pb-5"
                />
              </Link>
            </li>
            {/* Dashboard Home Button */}
            <li>
              <Link
                to={"/dashboard"}
                className="is-drawer-close:tooltip tooltip-primary is-drawer-close:tooltip-right"
                data-tip="Dashboard Home"
              >
                {/* Home icon */}
                <FaHome size={20} />
                <span className="is-drawer-close:hidden">Homepage</span>
              </Link>
            </li>
            {/* Our Dashboard Links */}
            {/* STUDENT DASH */}
            {!isAdmin && role === "student" && (
              <>
                <li>
                  <NavLink
                    className="is-drawer-close:tooltip tooltip-primary is-drawer-close:tooltip-right"
                    data-tip="My Tuitions"
                    to="/dashboard/my-tuitions"
                  >
                    <FaChalkboardTeacher size={20} />
                    <span className="is-drawer-close:hidden">My Tuitions</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="is-drawer-close:tooltip tooltip-primary is-drawer-close:tooltip-right"
                    data-tip="Post New Tuition"
                    to="/dashboard/post-tuitions"
                  >
                    <LuNotebookPen size={20} />
                    <span className="is-drawer-close:hidden">
                      Post New Tuition
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="is-drawer-close:tooltip tooltip-primary is-drawer-close:tooltip-right"
                    data-tip="Applied Tutors"
                    to="/dashboard/applied-tutors"
                  >
                    <FaUsers size={20} />
                    <span className="is-drawer-close:hidden">
                      Applied Tutors
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="is-drawer-close:tooltip tooltip-primary is-drawer-close:tooltip-right"
                    data-tip="Payments"
                    to="/dashboard/payments"
                  >
                    <BsFillCreditCardFill size={20} />
                    <span className="is-drawer-close:hidden">Payments</span>
                  </NavLink>
                </li>
              </>
            )}

            {/* TUTOR DASH */}
            {!isAdmin && role === "tutor" && (
              <>
                <li>
                  <NavLink
                    className="is-drawer-close:tooltip tooltip-primary is-drawer-close:tooltip-right"
                    data-tip="My Applications"
                    to="/dashboard/my-applications"
                  >
                    <IoDocumentAttachOutline size={20} />
                    <span className="is-drawer-close:hidden">
                      My Applications
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="is-drawer-close:tooltip tooltip-primary is-drawer-close:tooltip-right"
                    data-tip="Ongoing Tuitions"
                    to="/dashboard/ongoing-tuitions"
                  >
                    <PiFlowArrowBold size={20} />
                    <span className="is-drawer-close:hidden">
                      Ongoing Tuitions
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="is-drawer-close:tooltip tooltip-primary is-drawer-close:tooltip-right"
                    data-tip="Revenue History"
                    to="/dashboard/revenue-history"
                  >
                    <FaMoneyBillTrendUp size={20} />
                    <span className="is-drawer-close:hidden">
                      Revenue History
                    </span>
                  </NavLink>
                </li>
              </>
            )}

            {/* ADMIN DASH */}
            {isAdmin && (
              <>
                <li>
                  <NavLink
                    className="is-drawer-close:tooltip tooltip-primary is-drawer-close:tooltip-right"
                    data-tip="User Management"
                    to="/dashboard/user-management"
                  >
                    <FaUsersGear size={20} />
                    <span className="is-drawer-close:hidden">
                      User Management
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="is-drawer-close:tooltip tooltip-primary is-drawer-close:tooltip-right"
                    data-tip="Tutor Management"
                    to="/dashboard/tutor-management"
                  >
                    <GiTeacher size={20} />
                    <span className="is-drawer-close:hidden">
                      Tutor Management
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="is-drawer-close:tooltip tooltip-primary is-drawer-close:tooltip-right"
                    data-tip="Reports & Analytics"
                    to="/dashboard/reports-analytics"
                  >
                    <TbDeviceDesktopAnalytics size={20} />
                    <span className="is-drawer-close:hidden">
                      Reports & Analytics
                    </span>
                  </NavLink>
                </li>
              </>
            )}

            {/* List item */}
            <li>
              <button
                className="is-drawer-close:tooltip tooltip-primary is-drawer-close:tooltip-right"
                data-tip="Settings"
              >
                {/* Settings icon */}
                <VscSettingsGear size={20} />
                <span className="is-drawer-close:hidden">Settings</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
