import BlankComponent from "../fallback/Blank";
import ErrorFallback from "../fallback/ErrorFallback";
import Header from "./Header";
import LoadingFallback from "../fallback/LoadingFallback";
import { MemoryRouter } from "react-router-dom";
import type { Meta } from "@storybook/react";
import Nav from "./Nav";

const meta: Meta = {
  title: "components/gnb",
};

export default meta;

export const Blank = {
  render: () => (
    <MemoryRouter>
      <Header />
      <Nav />
      <main className="mt-[50px] ml-[250px] p-[20px]">
        <BlankComponent />
      </main>
    </MemoryRouter>
  ),
};

export const Error = {
  render: () => (
    <MemoryRouter>
      <Header />
      <Nav />
      <main className="mt-[50px] ml-[250px] p-[20px]">
        <ErrorFallback />
      </main>
    </MemoryRouter>
  ),
};

export const Loading = {
  render: () => (
    <MemoryRouter>
      <Header />
      <Nav />
      <main className="mt-[50px] ml-[250px] p-[20px]">
        <LoadingFallback />
      </main>
    </MemoryRouter>
  ),
};
