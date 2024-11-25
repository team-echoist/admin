import Header from "../components/GNB/Header";
import Nav from "../components/GNB/Nav";
import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
  return (
    <>
      <Header />
      <Nav />
      <main className="mt-[50px]">
        <Outlet />
      </main>
    </>
  );
};

export default DefaultLayout;
