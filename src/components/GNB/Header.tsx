import { AuthPaths } from "../../router/paths";
import { Link } from "react-router-dom";
import ServerStatus from "./ServerStatus";
import { cn } from "../../lib/utils";

const Header = () => {
  return (
    <header
      className={cn(
        "fixed top-[0px] w-full h-[50px] bg-blue z-[9999]",
        "flex justify-between items-center px-[30px]"
      )}
    >
      <div className="flex items-center gap-[20px]">
        <h1 className="text-white text-2xl">링크드아웃</h1>
        <ServerStatus />
      </div>
      <div className="flex gap-[15px]">
        <div className="text-white">My Page</div>
        <Link className="text-white" to={`/auth/${AuthPaths.LOGIN}`}>
          Logout
        </Link>
      </div>
    </header>
  );
};

export default Header;
