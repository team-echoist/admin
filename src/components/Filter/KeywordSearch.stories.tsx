import { Meta, StoryObj } from "@storybook/react";

import KeywordSearch from "./KeywordSearch";
import { useState } from "react";

const meta: Meta<typeof KeywordSearch> = {
  title: "components/keywordSearch",
  component: KeywordSearch,
  tags: ["autodocs"],
  argTypes: {
    keyword: { control: "text" },
    onKeywordChange: { action: "onKeywordChange" },
  },
};

export default meta;

type KeywordSearchStory = StoryObj<typeof KeywordSearch>;

export const Default: KeywordSearchStory = {
  args: {
    keyword: "",
  },
};

export const WithKeyword: KeywordSearchStory = {
  args: {
    keyword: "Keyword",
    placeholder: "Enter search keyword",
  },
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [keyword, setKeyword] = useState(args.keyword);
    return (
      <KeywordSearch {...args} keyword={keyword} onKeywordChange={setKeyword} />
    );
  },
};
