import Header from "./Header";
import { MemoryRouter } from "react-router-dom";
import type { Meta } from "@storybook/react";

const meta: Meta = {
  title: "gnb/Header",
  component: Header,
};

export default meta;

export const Default = {
  render: () => (
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  ),
};
