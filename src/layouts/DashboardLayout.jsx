import React, { useContext } from "react";
import { FaChalkboardTeacher, FaHome } from "react-icons/fa";
import { LuNotebookPen } from "react-icons/lu";
import { Link, Navigate, NavLink, Outlet } from "react-router";
import logoImg from "../assets/logo-icon.png";
import { VscSettingsGear } from "react-icons/vsc";
import { IoDocumentAttachOutline } from "react-icons/io5";
import { FaMoneyBillTrendUp, FaUsers, FaUsersGear } from "react-icons/fa6";
import { GrDocumentConfig } from "react-icons/gr";
import { ImProfile } from "react-icons/im";
import { GiTeacher } from "react-icons/gi";
import {
  BsFillCreditCardFill,
  BsMoonStarsFill,
  BsSunFill,
} from "react-icons/bs";
import { ThemeContext } from "../contexts/ThemeContext/ThemeContext";
import useCurrentUser from "../hooks/useCurrentUser";
import { PiFlowArrowBold } from "react-icons/pi";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { IoMdLogOut } from "react-icons/io";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import LoadingLottie from "../components/Lotties/LoadingLottie";

const DashboardLayout = () => {
  const { role, isAdmin, name, photoURL, roleLoading, profileCompleted } =
    useCurrentUser();

  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user, logOut } = useAuth();
  // const location = useLocation();

  if (!user || roleLoading) return <LoadingLottie />;

  const activeNavItem =
    "bg-primary/15 text-primary font-semibold border-l-4 border-primary";

  const baseNavItem =
    "is-drawer-close:tooltip mx-auto tooltip-primary is-drawer-close:tooltip-right transition-all";

  const disabledNavItem = "opacity-40 cursor-not-allowed";
  const tutorLocked = role === "tutor" && !profileCompleted;

  const handleLogout = () => {
    logOut()
      .then(() => toast.info("You have been logged out"))
      .catch((err) => console.log(err));
  };

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar flex items-center justify-between w-full bg-base-300">
          <div className="left flex items-center">
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
                className="my-1.5 inline-block size-6"
              >
                <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                <path d="M9 4v16"></path>
                <path d="M14 10l2 2l-2 2"></path>
              </svg>
            </label>
            <div className="px-4 text-primary font-bold text-xl">
              eTuitionBD <span className="text-base-content">Dashboard</span>
            </div>
          </div>
          <div className="right flex items-center gap-2 px-5">
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
                  <BsMoonStarsFill className="text-base-content" />
                ) : (
                  <BsSunFill className="text-yellow-500" />
                )}
              </button>
            </div>
            {/* Profile photo */}
            <div
              className="w-10 h-10 rounded-full border-2 border-primary lg:tooltip tooltip-primary lg:tooltip-bottom"
              data-tip={name}
            >
              <img
                src={
                  photoURL ||
                  "https://img.icons8.com/?size=48&id=kDoeg22e5jUY&format=png"
                }
                alt={name}
                className="w-full h-full rounded-full overflow-hidden object-cover"
              />
            </div>
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
            <li className="border-b pb-3">
              <Link
                to="/"
                className="is-drawer-close:tooltip tooltip-primary is-drawer-close:tooltip-right"
                data-tip="Homepage"
              >
                <div></div>
                <img
                  src={logoImg}
                  alt="logoImg"
                  className="w-20 mx-auto is-drawer-open:py-5"
                />
              </Link>
            </li>
            {/* Dashboard Home Button */}
            <li>
              <NavLink
                to="/dashboard"
                end
                onClick={(e) => {
                  if (tutorLocked) e.preventDefault();
                }}
                className={({ isActive }) =>
                  `${baseNavItem}
                   ${tutorLocked ? disabledNavItem : ""}
                   ${isActive && !tutorLocked ? activeNavItem : ""}`
                }
                data-tip={
                  tutorLocked
                    ? "Complete your tutor profile first"
                    : "Dashboard Home"
                }
              >
                <FaHome size={20} />
                <span className="is-drawer-close:hidden">Homepage</span>
              </NavLink>
            </li>
            {/* Our Dashboard Links */}
            {/* STUDENT DASH */}
            {!isAdmin && role === "student" && (
              <>
                <li>
                  <NavLink
                    className="is-drawer-close:tooltip mx-auto tooltip-primary is-drawer-close:tooltip-right"
                    data-tip="My Tuitions"
                    to="/dashboard/my-tuitions"
                  >
                    <FaChalkboardTeacher size={20} />
                    <span className="is-drawer-close:hidden">My Tuitions</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="is-drawer-close:tooltip mx-auto tooltip-primary is-drawer-close:tooltip-right"
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
                    className="is-drawer-close:tooltip mx-auto tooltip-primary is-drawer-close:tooltip-right"
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
                    className="is-drawer-close:tooltip mx-auto tooltip-primary is-drawer-close:tooltip-right"
                    data-tip="Payment History"
                    to="/dashboard/payment-history"
                  >
                    <BsFillCreditCardFill size={20} />
                    <span className="is-drawer-close:hidden">
                      Payment History
                    </span>
                  </NavLink>
                </li>
              </>
            )}
            {/* TUTOR DASH */}
            {!isAdmin && role === "tutor" && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/my-applications"
                    onClick={(e) => {
                      if (tutorLocked) e.preventDefault();
                    }}
                    className={({ isActive }) =>
                      `${baseNavItem}     ${
                        tutorLocked ? disabledNavItem : ""
                      } ${isActive && !tutorLocked ? activeNavItem : ""}`
                    }
                    data-tip={
                      tutorLocked
                        ? "Complete your tutor profile first"
                        : "My Applications"
                    }
                  >
                    <IoDocumentAttachOutline size={20} />
                    <span className="is-drawer-close:hidden">
                      My Applications
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/ongoing-tuitions"
                    onClick={(e) => {
                      if (tutorLocked) e.preventDefault();
                    }}
                    className={({ isActive }) =>
                      `${baseNavItem}     ${
                        tutorLocked ? disabledNavItem : ""
                      } ${isActive && !tutorLocked ? activeNavItem : ""}`
                    }
                    data-tip={
                      tutorLocked
                        ? "Complete your tutor profile first"
                        : "Ongoing Tuitions"
                    }
                  >
                    <PiFlowArrowBold size={20} />
                    <span className="is-drawer-close:hidden">
                      Ongoing Tuitions
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    onClick={(e) => {
                      if (tutorLocked) e.preventDefault();
                    }}
                    className={({ isActive }) =>
                      `${baseNavItem}     ${
                        tutorLocked ? disabledNavItem : ""
                      } ${isActive && !tutorLocked ? activeNavItem : ""}`
                    }
                    data-tip={
                      tutorLocked
                        ? "Complete your tutor profile first"
                        : "Revenue History"
                    }
                    to="/dashboard/revenue-history"
                  >
                    <FaMoneyBillTrendUp size={20} />
                    <span className="is-drawer-close:hidden">
                      Revenue History
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/tutor-profile-setup"
                    className={({ isActive }) =>
                      `${baseNavItem}     ${
                        tutorLocked ? disabledNavItem : ""
                      } ${isActive && !tutorLocked ? activeNavItem : ""}`
                    }
                    data-tip={
                      tutorLocked
                        ? "Complete Tutor Profile"
                        : "Update Tutor Profile"
                    }
                  >
                    <ImProfile size={20} />
                    <span className="is-drawer-close:hidden">
                      {tutorLocked
                        ? "Complete Tutor Profile"
                        : "Update Tutor Profile"}
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
                    className="is-drawer-close:tooltip mx-auto tooltip-primary is-drawer-close:tooltip-right"
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
                    className="is-drawer-close:tooltip mx-auto tooltip-primary is-drawer-close:tooltip-right"
                    data-tip="Tuition Post Management"
                    to="/dashboard/tuition-post-management"
                  >
                    <GrDocumentConfig size={20} />
                    <span className="is-drawer-close:hidden">
                      Tuition Post Management
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="is-drawer-close:tooltip mx-auto tooltip-primary is-drawer-close:tooltip-right"
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
                    className="is-drawer-close:tooltip mx-auto tooltip-primary is-drawer-close:tooltip-right"
                    data-tip="Reports & Analytics"
                    to="/dashboard/reports-analytics"
                  >
                    <TbDeviceDesktopAnalytics size={22} />
                    <span className="is-drawer-close:hidden">
                      Reports & Analytics
                    </span>
                  </NavLink>
                </li>
              </>
            )}

            {/* List item */}
            <li className="border-t pt-3">
              <Link
                to={"/userProfile"}
                className="is-drawer-close:tooltip mx-auto tooltip-primary is-drawer-close:tooltip-right"
                data-tip="Manage Profile"
              >
                {/* Settings icon */}
                <VscSettingsGear size={20} />
                <span className="is-drawer-close:hidden">Manage Profile</span>
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="is-drawer-close:tooltip tooltip-primary is-drawer-close:tooltip-right"
                data-tip="Logout"
              >
                {/* Settings icon */}
                <IoMdLogOut size={25} />
                <span className="is-drawer-close:hidden">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
