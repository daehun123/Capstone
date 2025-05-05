import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { Notfound } from "../pages/Notfound";
import App from "../App";

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
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "mypage",
        element: <MyPage />,
      },
      {
        path: "setting",
        element: <Setting />,
      },
      { path: "emailset", element: <EmailSetPage /> },
      {
        path: "passwordset",
        element: <PassWordSet />,
      },
      { path: "bookmark", element: <BookMarkPage /> },
    ],
  },
]);
