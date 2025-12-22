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
import TuitionDetails from "../pages/Tuitions/TuitionDetails";
import MyApplications from "../pages/Dashboards/Tutor Dashboard/MyApplications/MyApplications";
import OngoingTuitions from "../pages/Dashboards/Tutor Dashboard/OngoingTuitions/OngoingTuitions";
import RevenueHistory from "../pages/Dashboards/Tutor Dashboard/RevenueHistory/RevenueHistory";
import UserManagement from "../pages/Dashboards/Admin Dashboard/UserManagement/UserManagement";
import ReportsAnalytics from "../pages/Dashboards/Admin Dashboard/ReportsAnalytics/ReportsAnalytics";
import UserProfile from "../pages/UserProfile/UserProfile";
import PaymentHistory from "../pages/Dashboards/Student Dashboard/Payments/PaymentHistory";
import Payment from "../pages/Dashboards/Student Dashboard/Payments/Payment";
import PaymentSuccess from "../pages/Dashboards/Student Dashboard/Payments/PaymentSuccess";
import PaymentCancelled from "../pages/Dashboards/Student Dashboard/Payments/PaymentCancelled";
import StudentRoute from "./StudentRoute";
import TutorRoute from "./TutorRoute";
import AdminRoute from "./AdminRoute";
import TuitionPostManagement from "../pages/Dashboards/Admin Dashboard/TuitionPostManagement/TuitionPostManagement";
import Tutors from "../pages/Tutors/Tutors";
import TutorProfileSetup from "../pages/Tutors/TutorProfileSetup";
import TutorManagement from "../pages/Dashboards/Admin Dashboard/TutorManagement/TutorManagement";
import TutorProfileGuard from "./TutorProfileGuard";
import PublicRoute from "./PublicRoute";

export const router = createBrowserRouter([
  // Root Layout
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        element: <Home />,
        hydrateFallbackElement: <LoadingLottie />,
      },
      {
        path: "/tuitions",
        element: <Tuitions></Tuitions>,
        hydrateFallbackElement: <LoadingLottie />,
      },
      {
        path: "/tuition/:id",
        element: (
          <PrivateRoute>
            <TuitionDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/tutors",
        element: <Tutors></Tutors>,
        hydrateFallbackElement: <LoadingLottie />,
      },
      {
        path: "/about",
        element: <About></About>,
        hydrateFallbackElement: <LoadingLottie />,
      },
      {
        path: "/userProfile",
        element: (
          <PrivateRoute>
            <UserProfile></UserProfile>
          </PrivateRoute>
        ),
      },
    ],
  },
  // AuthLayout
  {
    path: "/auth",
    element: <AuthLayout />,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "login",
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
        hydrateFallbackElement: <LoadingLottie />,
      },
      {
        path: "register",
        element: (
          <PublicRoute>
            <Register />
          </PublicRoute>
        ),
        hydrateFallbackElement: <LoadingLottie />,
      },
    ],
  },
  // DashboardLayout
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <TutorProfileGuard>
          <DashboardLayout />
        </TutorProfileGuard>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardHome></DashboardHome>,
      },
      {
        path: "my-tuitions",
        element: (
          <StudentRoute>
            <MyTuitions></MyTuitions>
          </StudentRoute>
        ),
      },
      {
        path: "post-tuitions",
        element: (
          <StudentRoute>
            <PostTuitions></PostTuitions>
          </StudentRoute>
        ),
      },
      {
        path: "applied-tutors",
        element: (
          <StudentRoute>
            <AppliedTutors></AppliedTutors>
          </StudentRoute>
        ),
      },
      {
        path: "payment-history",
        element: (
          <StudentRoute>
            <PaymentHistory></PaymentHistory>
          </StudentRoute>
        ),
      },
      {
        path: "payment/:tuitionPostId",
        element: (
          <StudentRoute>
            <Payment />
          </StudentRoute>
        ),
      },
      {
        path: "payment-success",
        element: (
          <StudentRoute>
            <PaymentSuccess />
          </StudentRoute>
        ),
      },
      {
        path: "payment-cancelled",
        element: (
          <StudentRoute>
            <PaymentCancelled />
          </StudentRoute>
        ),
      },
      {
        path: "tutor-profile-setup",
        element: (
          <TutorRoute>
            <TutorProfileSetup />
          </TutorRoute>
        ),
      },
      {
        path: "my-applications",
        element: (
          <TutorRoute>
            <MyApplications></MyApplications>
          </TutorRoute>
        ),
      },
      {
        path: "ongoing-tuitions",
        element: (
          <TutorRoute>
            <OngoingTuitions></OngoingTuitions>
          </TutorRoute>
        ),
      },
      {
        path: "revenue-history",
        element: (
          <TutorRoute>
            <RevenueHistory></RevenueHistory>
          </TutorRoute>
        ),
      },
      {
        path: "admin/user-management",
        element: (
          <AdminRoute>
            <UserManagement></UserManagement>
          </AdminRoute>
        ),
      },
      {
        path: "admin/tuition-post-management",
        element: (
          <AdminRoute>
            <TuitionPostManagement></TuitionPostManagement>
          </AdminRoute>
        ),
      },
      {
        path: "admin/tutor-management",
        element: (
          <AdminRoute>
            <TutorManagement></TutorManagement>
          </AdminRoute>
        ),
      },
      {
        path: "admin/reports-analytics",
        element: (
          <AdminRoute>
            <ReportsAnalytics></ReportsAnalytics>
          </AdminRoute>
        ),
      },
    ],
  },
]);
