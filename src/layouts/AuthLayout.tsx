import Header from "../comonents/GNB/Header";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default AuthLayout;
