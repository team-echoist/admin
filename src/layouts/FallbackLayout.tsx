import Header from "../components/GNB/Header";
import { Outlet } from "react-router-dom";

const FallbackLayout = () => {
  return (
    <>
      <Header />
      <main className="mt-[50px]">
        <Outlet />
      </main>
    </>
  );
};

export default FallbackLayout;
