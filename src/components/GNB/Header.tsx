import { Link, useNavigate } from "react-router-dom";

import { AuthPaths } from "../../router/paths";
import { Button } from "../ui/button";
import ServerStatus from "./ServerStatus";
import { cn } from "../../lib/utils";
import logo from "../../assets/black_logo.png";

const Header = () => {
  const navigate = useNavigate();
  const isLogin = localStorage.getItem("accessToken");

  return (
    <header
      className={cn(
        "fixed top-[0px] left-0 right-0 w-full h-[50px] bg-blue z-[9999]",
        "flex justify-between items-center px-[30px]"
      )}
    >
      <div className="flex items-center gap-[10px]">
        <div className="rounded-[8px] overflow-hidden">
          <img src={logo} alt="링크드아웃 로고" width={40} />
        </div>
        <h1 className="text-white text-2xl">Linked Out</h1>
        {isLogin && <ServerStatus />}
      </div>
      <div className="flex gap-[15px] items-center">
        {isLogin ? (
          <>
            <div className="text-white">My Page</div>
            <Button
              className="text-white"
              variant="ghost"
              onClick={() => {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                navigate(`/auth/${AuthPaths.LOGIN}`);
              }}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link to={`/auth/${AuthPaths.LOGIN}`}>
              <Button className="text-white" variant="ghost">
                LOGIN
              </Button>
            </Link>
            <Link to={`/auth/${AuthPaths.REGISTER}`}>
              <Button className="text-white" variant="ghost">
                REGISTER
              </Button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
