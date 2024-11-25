import NavItem from "./NavItem";
import { cn } from "../../lib/utils";
import { useState } from "react";

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
            "fixed top-[50px] bottom-0 left-0 w-[300px] bg-lightblue",
            "flex flex-col"
          )}
        >
          <NavItem iconId={"home"} label="대시보드" to={""} />
          <NavItem iconId={"edit"} label="에세이 목록" to={""} />
        </div>
      ) : (
        <div onClick={toggleIsNavOpen}>닫힘</div>
      )}
    </>
  );
};

export default Nav;
