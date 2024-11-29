import { DefaultPaths } from "../../router/paths";
import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";
import sprite from "../../assets/SVGsprite.svg";
import { useState } from "react";

type NavItemType = { iconId: string; label: string; to: string };

const items: NavItemType[] = [
  { iconId: "home", label: "대시보드", to: DefaultPaths.DASHBOARD },
  { iconId: "user-list", label: "사용자 목록", to: DefaultPaths.USER.LIST },
  { iconId: "edit", label: "에세이 목록", to: DefaultPaths.ESSAY.LIST },
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
  { iconId: "pencil", label: "관리자 기록", to: DefaultPaths.MANAGER.HISTORY },
  { iconId: "gifts", label: "글로키 목록", to: DefaultPaths.GEULROQUIS.LIST },
  { iconId: "smile", label: "테마 목록", to: DefaultPaths.THEME.LIST },
  { iconId: "star", label: "아이템 목록", to: DefaultPaths.ITEM.LIST },
  { iconId: "release-list", label: "버전 관리", to: DefaultPaths.VERSION },
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

const NavItem = ({ iconId, label, to }: NavItemType) => {
  return (
    <Link className="flex gap-[15px] items-center px-[15px] py-[10px]" to={to}>
      <svg width={30} height={30}>
        <use href={`${sprite}#${iconId}`}></use>
      </svg>
      <div>{label}</div>
    </Link>
  );
};
