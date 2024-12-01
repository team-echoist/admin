import { Input } from "./input";

export default {
  title: "ui/Input",
  component: Input,
  tags: ["autodocs"],
};

export const Default = () => <Input placeholder="Enter something" />;

export const Large = () => (
  <Input placeholder="Enter something" className="text-lg" />
);

export const Password = () => (
  <Input type="password" placeholder="Enter password" />
);

export const File = () => <Input type="file" placeholder="Upload file" />;

export const Disabled = () => <Input placeholder="Can't type here" disabled />;

export const Error = () => (
  <Input
    placeholder="Enter something"
    className="border-red-500 focus:border-red-500"
  />
);

export const ReadOnly = () => <Input value="This is readonly" readOnly />;
