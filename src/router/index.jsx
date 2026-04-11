import { createBrowserRouter, Navigate } from "react-router-dom";
import ErrorPage from "../components/errors/ErrorPage";
import MainLayout from "../components/layout/MainLayout";
import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";
import BoardDetails from "../features/boards/pages/BoardDetails";
import BoardsPage from "../features/boards/pages/BoardsPage";
import DashboardPage from "../features/dashboard/pages/DashboardPage";
import SettingsPage from "../features/settings/pages/SettingsPage";
//import Tasks from "../features/tasks/pages/Tasks";
import CalendarPage from "../features/calender/pages/CalendarPage";
import MyTasksPages from "../features/tasks/pages/MyTasksPage";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import ProfileSettings from "../features/account/ProfileSettings";
import AccountSettings from "../features/account/AccountSettings";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      {
        element: <PublicRoute />,
        children: [
          {
            path: "/login",
            element: <LoginPage />,
          },
          {
            path: "/register",
            element: <RegisterPage />,
          },
        ],
      },

      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/",
            element: <MainLayout />, // App هو الـ Layout
            children: [
              {
                index: true,
                element: <Navigate to="dashboard" replace />,
              },
              {
                path: "dashboard",
                element: <DashboardPage />,
              },
              {
                path: "my-tasks",
                element: <MyTasksPages />,
              },
              {
                path: "calender",
                element: <CalendarPage />,
              },
              {
                path: "settings",
                element: <SettingsPage />,
              },
              {
                path: "profile-settings",
                element: <ProfileSettings />,
              },
               {
                path: "account-settings",
                element: <AccountSettings />,
              },
              {
                path: "boards",
                element: <BoardsPage />,
              },
              {
                path: "board/:id",
                element: <BoardDetails />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
