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
import MyTuitions from "../pages/Dashboards/MyTuitions/MyTuitions";
import PrivateRoute from "./PrivateRoute";
import DashboardHome from "../pages/Dashboards/DashboardHome/DashboardHome";

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
    ],
  },
]);
