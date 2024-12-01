import { Button, ButtonProps } from "./button";

import type { Meta } from "@storybook/react";

const meta: Meta<ButtonProps> = {
  title: "ui/button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link",
      ],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon"],
    },
    disabled: {
      control: "boolean",
    },
    asChild: {
      control: "boolean",
    },
  },
};

export default meta;

export const Default = {
  args: {
    children: "Default Button",
    variant: "default",
    size: "default",
  },
};

export const Variants = () => (
  <div className="flex flex-col gap-4">
    <Button variant="default">Default</Button>
    <Button variant="destructive">Destructive</Button>
    <Button variant="outline">Outline</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="ghost">Ghost</Button>
    <Button variant="link">Link</Button>
  </div>
);

export const Sizes = () => (
  <div className="flex flex-col justify-center items-center gap-4">
    <Button size="xs">x</Button>
    <Button size="sm">Small</Button>
    <Button size="default">Default</Button>
    <Button size="lg">Large</Button>
    <Button size="icon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-5 h-5"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-10.707a1 1 0 00-1.414-1.414L9 9.586 7.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg>
    </Button>
  </div>
);

export const Disabled = {
  args: {
    children: "Disabled Button",
    disabled: true,
  },
};
