import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "assets/typography",
};

export default meta;

export const FontSize: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-[10px]">
      {fontSizeClasses.map((textStyle, index) => (
        <div key={index} className={textStyle}>
          {textStyle}: Lined Out Admin Page
        </div>
      ))}
    </div>
  ),
};

const fontSizeClasses = [
  "text-xs",
  "text-sm",
  "text-base",
  "text-lg",
  "text-xl",
  "text-2xl",
  "text-3xl",
  "text-4xl",
  "text-5xl",
  "text-6xl",
  "text-7xl",
  "text-8xl",
  "text-9xl",
];

export const FontWeight: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-[20px]">
      {fontWeightClasses.map((textStyle, index) => (
        <div key={index} className={textStyle}>
          {textStyle}: Lined Out Admin Page
        </div>
      ))}
    </div>
  ),
};

const fontWeightClasses = [
  "font-thin",
  "font-extralight",
  "font-light",
  "font-normal",
  "font-medium",
  "font-semibold",
  "font-bold",
  "font-extrabold",
  "font-black",
];

export const TextDecoration: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-[20px]">
      {textDecorationClasses.map((textStyle, index) => (
        <div key={index} className={textStyle}>
          {textStyle}: Lined Out Admin Page
        </div>
      ))}
    </div>
  ),
};

const textDecorationClasses = [
  "italic",
  "not-italic",
  "underline",
  "line-through",
  "no-underline",
];

export const LetterSpacing: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-[20px]">
      {letterSpacingClasses.map((textStyle, index) => (
        <div key={index} className={textStyle}>
          {textStyle}: Lined Out Admin Page
        </div>
      ))}
    </div>
  ),
};

const letterSpacingClasses = [
  "tracking-tighter",
  "tracking-tight",
  "tracking-normal",
  "tracking-wide",
  "tracking-wider",
  "tracking-widest",
];

export const LineHeight: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-[20px]">
      {lineHeightClasses.map((textStyle, index) => (
        <div key={index} className={textStyle}>
          {textStyle}: Lined Out Admin Page
        </div>
      ))}
    </div>
  ),
};

const lineHeightClasses = [
  "leading-tight",
  "leading-snug",
  "leading-normal",
  "leading-relaxed",
  "leading-loose",
  "leading-[1.75]",
  "leading-[2]",
];
