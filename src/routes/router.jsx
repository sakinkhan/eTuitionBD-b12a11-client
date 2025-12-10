import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Homepage/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Tuitions from "../pages/Tuitions/Tuitions";
import About from "../pages/About/About";
import ErrorPage from "../pages/shared/ErrorPage/ErrorPage";
import LoadingLottie from "../components/Lotties/LoadingLottie";
import DashboardLayout from "../layouts/DashboardLayout";
import MyTuitions from "../pages/Dashboards/Student Dashboard/MyTuitions/MyTuitions";
import PrivateRoute from "./PrivateRoute";
import DashboardHome from "../pages/Dashboards/DashboardHome/DashboardHome";
import PostTuitions from "../pages/Dashboards/Student Dashboard/PostTuitions/PostTuitions";
import AppliedTutors from "../pages/Dashboards/Student Dashboard/AppliedTutors/AppliedTutors";
import Payments from "../pages/Dashboards/Student Dashboard/Payments/Payments";
import TuitionDetails from "../pages/Tuitions/TuitionDetails";
import MyApplications from "../pages/Dashboards/Tutor Dashboard/MyApplications/MyApplications";
import OngoingTuitions from "../pages/Dashboards/Tutor Dashboard/OngoingTuitions/OngoingTuitions";
import RevenueHistory from "../pages/Dashboards/Tutor Dashboard/RevenueHistory/RevenueHistory";
import UserManagement from "../pages/Dashboards/Admin Dashboard/UserManagement/UserManagement";
import TutorManagement from "../pages/Dashboards/Admin Dashboard/TutorManagement/TutorManagement";
import ReportsAnalytics from "../pages/Dashboards/Admin Dashboard/ReportsAnalytics/ReportsAnalytics";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        Component: Home,
        hydrateFallbackElement: <LoadingLottie></LoadingLottie>,
      },
      {
        path: "/tuitions",
        element: <Tuitions></Tuitions>,
        hydrateFallbackElement: <LoadingLottie></LoadingLottie>,
      },
      {
        path: "/tuition/:id",
        element: (
          <PrivateRoute>
            <TuitionDetails></TuitionDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/about",
        element: <About></About>,
        hydrateFallbackElement: <LoadingLottie></LoadingLottie>,
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "login",
        element: <Login></Login>,
        hydrateFallbackElement: <LoadingLottie></LoadingLottie>,
      },
      {
        path: "register",
        element: <Register></Register>,
        hydrateFallbackElement: <LoadingLottie></LoadingLottie>,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardHome></DashboardHome>,
      },
      {
        path: "my-tuitions",
        element: <MyTuitions></MyTuitions>,
      },
      {
        path: "post-tuitions",
        element: <PostTuitions></PostTuitions>,
      },
      {
        path: "applied-tutors",
        element: <AppliedTutors></AppliedTutors>,
      },
      {
        path: "payments",
        element: <Payments></Payments>,
      },
      {
        path: "my-applications",
        element: <MyApplications></MyApplications>,
      },
      {
        path: "ongoing-tuitions",
        element: <OngoingTuitions></OngoingTuitions>,
      },
      {
        path: "revenue-history",
        element: <RevenueHistory></RevenueHistory>,
      },
      {
        path: "user-management",
        element: <UserManagement></UserManagement>,
      },
      {
        path: "tutor-management",
        element: <TutorManagement></TutorManagement>,
      },
      {
        path: "reports-analytics",
        element: <ReportsAnalytics></ReportsAnalytics>,
      },
    ],
  },
]);
