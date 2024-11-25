import Header from "../comonents/GNB/Header";
import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
  return (
    <>
      <Header />
      <main className="mt-[50px]">
        <Outlet />
      </main>
    </>
  );
};

export default DefaultLayout;
