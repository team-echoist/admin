import Header from "../comonents/GNB/Header";
import { Outlet } from "react-router-dom";

const FallbackLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default FallbackLayout;
