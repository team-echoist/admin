import type { Meta } from "@storybook/react";
import sprite from "./SVGsprite.svg";

const meta: Meta = {
  title: "assets/icons",
};

export default meta;

export const Default = {
  render: () => (
    <div className="grid grid-cols-5">
      {ids.map((id, index) => (
        <div key={index} className="flex flex-col">
          <svg width={30} height={30}>
            <use href={`${sprite}#${id}`}></use>
          </svg>
          <div>{id}</div>
        </div>
      ))}
    </div>
  ),
};

const ids = [
  "photo",
  "edit",
  "gifts",
  "notice",
  "search",
  "home",
  "trash",
  "user-list",
  "essay-list",
  "report-list",
  "release-list",
  "query",
  "manager-list",
  "smile",
  "pencil",
  "folder",
  "warning",
];
