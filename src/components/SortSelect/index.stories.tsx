import { Meta, StoryObj } from "@storybook/react";

import SortSelect from ".";

const meta: Meta<typeof SortSelect> = {
  title: "components/sortSelect",
  component: SortSelect,
  tags: ["autodocs"],
  argTypes: {
    onChange: { action: "changed" },
  },
};

export default meta;

type SortSelectStory = StoryObj<typeof SortSelect>;

export const Default: SortSelectStory = {
  args: {
    options: [
      { value: "name", label: "이름순" },
      { value: "date", label: "날짜순" },
      { value: "price", label: "가격순" },
    ],
    defaultValue: "name",
  },
};

export const CheckBox: SortSelectStory = {
  args: {
    options: [{ value: "unread", label: "안읽은 메시지만 보기" }],
    defaultValue: "all",
  },
};
