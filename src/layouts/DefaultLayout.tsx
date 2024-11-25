import Header from "../comonents/GNB/Header";
import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default DefaultLayout;
