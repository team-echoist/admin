import { AuthPaths, DefaultPaths } from "./paths";

import AuthLayout from "../layouts/AuthLayout";
import Dashboard from "../pages/dashboard/page";
import DefaultLayout from "../layouts/DefaultLayout";
import ErrorPage from "../pages/errors/Error";
import EssayDetail from "../pages/essay/Detail";
import EssayList from "../pages/essay/List";
import GeulroquisList from "../pages/geulroquis/List";
import LoginPage from "../pages/auth/Login";
import ManagerDetail from "../pages/manager/Detail";
import ManagerList from "../pages/manager/List";
import ManagerLog from "../pages/manager/Log";
import Monitoring from "../pages/monitoring";
import MyPage from "../pages/my";
import NotFound from "../pages/errors/NotFound";
import NoticeDetail from "../pages/notice/Detail";
import NoticeList from "../pages/notice/List";
import RegisterPage from "../pages/auth/Regsiter";
import ReportList from "../pages/report/List";
import ThemeList from "../pages/theme/List";
import UserDetail from "../pages/user/Detail";
import UserList from "../pages/user/List";
import Version from "../pages/version/Version";
import { VersionLoader } from "../pages/version/VersionLoader";
import authCheckLoader from "../layouts/authCheckLoader";
import { createBrowserRouter } from "react-router-dom";
import { essayDetailLoader } from "../pages/essay/DetailLoader";
import { managerDetailLoader } from "../pages/manager/DetailLoader";
import { noticeDetailLoader } from "../pages/notice/DetailLoader";
import { userDetailLoader } from "../pages/user/DetailLoader";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    loader: () => authCheckLoader("DefaultLayout"),
    children: [
      { path: DefaultPaths.DASHBOARD, element: <Dashboard /> },
      {
        path: DefaultPaths.ESSAY.LIST,
        element: <EssayList />,
      },
      {
        path: DefaultPaths.ESSAY.DETAIL,
        element: <EssayDetail />,
        loader: essayDetailLoader,
      },
      {
        path: DefaultPaths.NOTICE.LIST,
        element: <NoticeList />,
      },
      {
        path: DefaultPaths.NOTICE.DETAIL,
        element: <NoticeDetail />,
        loader: noticeDetailLoader,
      },
      {
        path: DefaultPaths.USER.LIST,
        element: <UserList />,
      },
      {
        path: DefaultPaths.USER.DETAIL,
        element: <UserDetail />,
        loader: userDetailLoader,
      },
      {
        path: DefaultPaths.MANAGER.DETAIL,
        element: <ManagerDetail />,
        loader: managerDetailLoader,
      },
      {
        path: DefaultPaths.MANAGER.LIST,
        element: <ManagerList />,
      },
      {
        path: DefaultPaths.MANAGER.HISTORY,
        element: <ManagerLog />,
      },
      {
        path: DefaultPaths.GEULROQUIS.LIST,
        element: <GeulroquisList />,
      },
      {
        path: DefaultPaths.REPORT.LIST,
        element: <ReportList />,
      },
      {
        path: DefaultPaths.RELEASE.LIST,
        element: <div>릴리즈 리스트 페이지</div>,
      },
      {
        path: DefaultPaths.RELEASE.DETAIL,
        element: <div>릴리즈 리스트 페이지</div>,
      },
      {
        path: DefaultPaths.ITEM.LIST,
        element: <div>아이템 리스트 페이지</div>,
      },
      {
        path: DefaultPaths.ITEM.DETAIL,
        element: <div>아이템 리스트 페이지</div>,
      },
      {
        path: DefaultPaths.QUERY.LIST,
        element: <div>문의사항 리스트 페이지</div>,
      },
      {
        path: DefaultPaths.QUERY.DETAIL,
        element: <div>문의사항 리스트 페이지</div>,
      },
      {
        path: DefaultPaths.VERSION,
        element: <Version />,
        loader: VersionLoader,
      },
      {
        path: DefaultPaths.THEME.LIST,
        element: <ThemeList />,
      },
      {
        path: DefaultPaths.MY,
        element: <MyPage />,
      },
      {
        path: DefaultPaths.MONITORING,
        element: <Monitoring />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    loader: () => authCheckLoader("AuthLayout"),
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
