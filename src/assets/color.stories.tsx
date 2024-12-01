import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "assets/color",
};

export default meta;

export const Basic: StoryObj = {
  render: () => (
    <div className="flex flex-wrap gap-[20px]">
      {colors.map(({ label, value }, index) => (
        <ColorToken key={index} label={label} color={value} />
      ))}
    </div>
  ),
};

const colors = [
  { label: "gray", value: "rgb(140, 140, 140)" },
  { label: "lightGray", value: "rgb(231, 231, 231)" },
  { label: "blue", value: "rgb(24, 31, 71)" },
  { label: "lightblue", value: "rgb(209, 215, 239)" },
  { label: "error", value: "rgb(173, 8, 8)" },
  { label: "warning", value: "rgb(8, 109, 10)" },
];

const ColorToken = ({ color, label }: { label: string; color: string }) => {
  return (
    <div className="flex flex-col gap-[5px] p-[10px] rounded-md border">
      <div
        className={color}
        style={{ width: "100px", height: "100px", backgroundColor: color }}
      ></div>
      <div className="text-center text-xl">{label}</div>
    </div>
  );
};
