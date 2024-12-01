import { MemoryRouter } from "react-router-dom";
import type { Meta } from "@storybook/react";
import Nav from "./Nav";

const meta: Meta = {
  title: "gnb/nav",
  component: Nav,
};

export default meta;

export const Default = {
  render: () => (
    <MemoryRouter>
      <Nav />
    </MemoryRouter>
  ),
};
