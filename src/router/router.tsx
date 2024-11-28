import { AuthPaths, DefaultPaths } from "./paths";

import AuthLayout from "../layouts/AuthLayout";
import Dashboard from "../pages/dashboard/page";
import DefaultLayout from "../layouts/DefaultLayout";
import ErrorPage from "../pages/errors/Error";
import EssayDetail from "../pages/essay/Detail";
import EssayList from "../pages/essay/List";
import LoginPage from "../pages/auth/Login";
import NotFound from "../pages/errors/NotFound";
import NoticeDetail from "../pages/notice/Detail";
import NoticeList from "../pages/notice/List";
import { NoticeListLoader } from "../pages/notice/ListLoader";
import RegisterPage from "../pages/auth/Regsiter";
import checkAuthLoader from "../layouts/AuthLoader";
import checkDefaultLoader from "../layouts/DefaultLoader";
import { createBrowserRouter } from "react-router-dom";
import { essayDetailLoader } from "../pages/essay/DetailLoader";
import { essayListLoader } from "../pages/essay/ListLoader";
import { noticeDetailLoader } from "../pages/notice/DetailLoader";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    loader: checkDefaultLoader,
    children: [
      { path: DefaultPaths.DASHBOARD, element: <Dashboard /> },
      {
        path: DefaultPaths.ESSAY.LIST,
        element: <EssayList />,
        loader: essayListLoader,
      },
      {
        path: DefaultPaths.ESSAY.DETAIL,
        element: <EssayDetail />,
        loader: essayDetailLoader,
      },
      {
        path: DefaultPaths.NOTICE.LIST,
        element: <NoticeList />,
        loader: NoticeListLoader,
      },
      {
        path: DefaultPaths.NOTICE.DETAIL,
        element: <NoticeDetail />,
        loader: noticeDetailLoader,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    loader: checkAuthLoader,
    children: [
      { path: AuthPaths.LOGIN, element: <LoginPage /> },
      { path: AuthPaths.REGISTER, element: <RegisterPage /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
