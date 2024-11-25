import Header from "../comonents/GNB/Header";
import { Outlet } from "react-router-dom";
import { cn } from "../lib/utils";

const AuthLayout = () => {
  return (
    <>
      <Header />
      <main
        className={cn(
          "pt-[50px] bg-blue h-screen",
          "flex justify-center items-center"
        )}
      >
        <Outlet />
      </main>
    </>
  );
};

export default AuthLayout;
