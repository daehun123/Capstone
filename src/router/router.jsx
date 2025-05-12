import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { Notfound } from "../pages/Notfound";
import App from "../App";
import ProtectedRoute from "./ProtectedRoute";
import PublicOnlyRoute from "./PublicOnlyRoute";

const FirstPage = lazy(() => import("../pages/FirstPage"));
const Login = lazy(() => import("../pages/Login"));
const Signup = lazy(() => import("../pages/Signup"));
const Home = lazy(() => import("../pages/Home"));
const MyPage = lazy(() => import("../pages/MyPage"));
const Setting = lazy(() => import("../pages/Setting"));
const BookMarkPage = lazy(() => import("../pages/BookMarkPage"));
const EmailSetPage = lazy(() => import("../pages/EmailSetPage"));
const PassWordSet = lazy(() => import("../pages/PassWordSet"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Notfound />,
    children: [
      {
        index: true,
        element: <FirstPage />,
      },
      {
        path: "login",
        element: (
          <PublicOnlyRoute>
            <Login />
          </PublicOnlyRoute>
        ),
      },
      {
        path: "signup",
        element: (
          <PublicOnlyRoute>
            <Signup />
          </PublicOnlyRoute>
        ),
      },
      {
        path: "home",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "mypage",
        element: (
          <ProtectedRoute>
            <MyPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "setting",
        element: (
          <ProtectedRoute>
            <Setting />
          </ProtectedRoute>
        ),
      },
      {
        path: "emailset",
        element: (
          <ProtectedRoute>
            <EmailSetPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "passwordset",
        element: (
          <ProtectedRoute>
            <PassWordSet />
          </ProtectedRoute>
        ),
      },
      {
        path: "bookmark",
        element: (
          <ProtectedRoute>
            <BookMarkPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
