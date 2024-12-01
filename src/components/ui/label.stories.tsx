import { Label } from "./label";
import type { Meta } from "@storybook/react";

const meta: Meta = {
  title: "ui/label",
  component: Label,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

export const Default = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <input
          type="text"
          id="name"
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <input
          type="email"
          id="email"
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
    </div>
  ),
};

export const Disabled = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <Label htmlFor="disabled-input" className="peer-disabled:opacity-70">
          Disabled Input
        </Label>
        <input
          type="text"
          id="disabled-input"
          disabled
          className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-100 shadow-sm sm:text-sm"
        />
      </div>
    </div>
  ),
};
