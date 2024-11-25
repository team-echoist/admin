import Header from "../comonents/GNB/Header";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <>
      <Header />
      <main className="mt-[50px]">
        <Outlet />
      </main>
    </>
  );
};

export default AuthLayout;
