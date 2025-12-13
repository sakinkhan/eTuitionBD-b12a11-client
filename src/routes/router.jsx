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
import TutorManagement from "../pages/Dashboards/Admin Dashboard/TutorManagement/TutorManagement";
import ReportsAnalytics from "../pages/Dashboards/Admin Dashboard/ReportsAnalytics/ReportsAnalytics";
import UserProfile from "../pages/UserProfile/UserProfile";
import PaymentHistory from "../pages/Dashboards/Student Dashboard/Payments/PaymentHistory";
import Payment from "../pages/Dashboards/Student Dashboard/Payments/Payment";
import PaymentSuccess from "../pages/Dashboards/Student Dashboard/Payments/PaymentSuccess";
import PaymentCancelled from "../pages/Dashboards/Student Dashboard/Payments/PaymentCancelled";
import StudentRoute from "./StudentRoute";
import TutorRoute from "./TutorRoute";
import AdminRoute from "./AdminRoute";

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
        path: "user-management",
        element: (
          <AdminRoute>
            <UserManagement></UserManagement>
          </AdminRoute>
        ),
      },
      {
        path: "tutor-management",
        element: (
          <AdminRoute>
            <TutorManagement></TutorManagement>
          </AdminRoute>
        ),
      },
      {
        path: "reports-analytics",
        element: (
          <AdminRoute>
            <ReportsAnalytics></ReportsAnalytics>
          </AdminRoute>
        ),
      },
    ],
  },
]);
