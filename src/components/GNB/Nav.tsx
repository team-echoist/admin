import { QueryFunction, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";

import { DefaultPaths } from "../../router/paths";
import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";
import essayQueryOptions from "../../queries/essayQueryOptions";
import geulroquisQueryOptions from "../../queries/geulroquisQueryOptions";
import managerQueryOptions from "../../queries/managerQueryOptions";
import sprite from "../../assets/SVGsprite.svg";
import themeQueryOptions from "../../queries/themeQueryOptions";
import userQueryOptions from "../../queries/userQueryOptions";

type NavItemType = {
  iconId: string;
  label: string;
  to: string;
  queryKey?: readonly unknown[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  queryFn?: QueryFunction<any>;
};

const items: NavItemType[] = [
  { iconId: "home", label: "대시보드", to: DefaultPaths.DASHBOARD },
  {
    iconId: "user-list",
    label: "사용자 목록",
    to: DefaultPaths.USER.LIST,
    queryKey: userQueryOptions.getUserList({
      pagination: { page: 1, perPage: 10 },
    }).queryKey,
    queryFn: userQueryOptions.getUserList({
      pagination: { page: 1, perPage: 10 },
    }).queryFn,
  },
  {
    iconId: "edit",
    label: "에세이 목록",
    to: DefaultPaths.ESSAY.LIST,
    queryKey: essayQueryOptions.getEssayList({
      pagination: { page: 1, perPage: 10 },
    }).queryKey,
    queryFn: essayQueryOptions.getEssayList({
      pagination: { page: 1, perPage: 10 },
    }).queryFn,
  },
  { iconId: "report-list", label: "레포트 목록", to: DefaultPaths.REPORT.LIST },
  {
    iconId: "essay-list",
    label: "릴리즈 목록",
    to: DefaultPaths.RELEASE.LIST,
  },
  { iconId: "notice", label: "공지사항", to: DefaultPaths.NOTICE.LIST },
  { iconId: "query", label: "문의사항", to: DefaultPaths.QUERY.LIST },
  {
    iconId: "manager-list",
    label: "관리자 목록",
    to: DefaultPaths.MANAGER.LIST,
  },
  {
    iconId: "pencil",
    label: "관리자 기록",
    to: DefaultPaths.MANAGER.HISTORY,
    queryKey: managerQueryOptions.getManagerList({
      pagination: { page: 1, perPage: 10 },
    }).queryKey,
    queryFn: managerQueryOptions.getManagerList({
      pagination: { page: 1, perPage: 10 },
    }).queryFn,
  },
  {
    iconId: "gifts",
    label: "글로키 목록",
    to: DefaultPaths.GEULROQUIS.LIST,
    queryKey: geulroquisQueryOptions.getGeulroquisList({
      pagination: { page: 1, perPage: 10 },
    }).queryKey,
    queryFn: geulroquisQueryOptions.getGeulroquisList({
      pagination: { page: 1, perPage: 10 },
    }).queryFn,
  },
  {
    iconId: "smile",
    label: "테마 목록",
    to: DefaultPaths.THEME.LIST,
    queryKey: themeQueryOptions.getThemeList().queryKey,
  },
  { iconId: "star", label: "아이템 목록", to: DefaultPaths.ITEM.LIST },
  { iconId: "folder", label: "버전 관리", to: DefaultPaths.VERSION },
  { iconId: "release-list", label: "모니터링", to: DefaultPaths.MONITORING },
  { iconId: "user-list", label: "마이 페이지", to: DefaultPaths.MY },
];

const Nav = () => {
  const [isNavOpen, setIsNavOpen] = useState(true);

  const toggleIsNavOpen = () => {
    setIsNavOpen((prev) => !prev);
  };

  return (
    <>
      {isNavOpen ? (
        <div
          className={cn(
            "fixed top-[50px] bottom-0 left-0 w-[250px] bg-lightblue",
            "flex flex-col"
          )}
        >
          {items.map((item, index) => (
            <NavItem key={index} {...item} />
          ))}
        </div>
      ) : (
        <div onClick={toggleIsNavOpen}>닫힘</div>
      )}
    </>
  );
};

export default Nav;

const NavItem = ({ iconId, label, to, queryKey, queryFn }: NavItemType) => {
  const queryClient = useQueryClient();
  const abortControllerRef = useRef<AbortController | null>(null);

  const handleMouseOver = () => {
    if (!queryKey || !queryFn) return;

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;
    queryClient.fetchQuery({
      queryKey,
      queryFn: () =>
        queryFn({
          signal: controller.signal,
          queryKey,
          meta: undefined,
        }),
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    });
  };

  const handleMouseOut = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  };

  return (
    <Link
      className="flex gap-[15px] items-center px-[15px] py-[10px]"
      to={to}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <svg width={30} height={30}>
        <use href={`${sprite}#${iconId}`}></use>
      </svg>
      <div>{label}</div>
    </Link>
  );
};
