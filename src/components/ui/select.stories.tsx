import { Meta, StoryObj } from "@storybook/react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "./select";

import { SelectProps } from "@radix-ui/react-select";

export default {
  title: "ui/select",
  component: Select,
  tags: ["autodocs"],
  subcomponents: {
    SelectGroup,
    SelectValue,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectSeparator,
    SelectLabel,
  },
  parameters: {
    controls: { expanded: true },
  },
} as Meta;

const Template: StoryObj<SelectProps> = {
  render: (args) => (
    <Select {...args}>
      <SelectTrigger>
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option-1">Option 1</SelectItem>
        <SelectItem value="option-2">Option 2</SelectItem>
        <SelectItem value="option-3">Option 3</SelectItem>
        <SelectSeparator />
        <SelectItem value="option-4">Option 4</SelectItem>
        <SelectItem value="option-4">Option 5</SelectItem>
        <SelectItem value="option-4">Option 6</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const Default = Template;
Default.args = {};
