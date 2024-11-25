import { cn } from "../../lib/utils";

const Header = () => {
  return (
    <header
      className={cn(
        "fixed top-[0px] w-full h-[50px] bg-blue z-[9999]",
        "flex justify-between items-center px-[30px]"
      )}
    >
      <h1 className="text-white text-2xl">링크드아웃</h1>
      <div className="flex gap-[15px]">
        <div className="text-white">My Page</div>
        <div className="text-white">Logout</div>
      </div>
    </header>
  );
};

export default Header;
