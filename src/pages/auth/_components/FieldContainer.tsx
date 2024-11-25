import { InputHTMLAttributes } from "react";

type FieldContainerProps = {
  label: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const FieldContainer = ({ label, error, ...props }: FieldContainerProps) => {
  return (
    <div className="flex flex-col w-[300px]">
      <label>{label}</label>
      <input className="border p-[5px]" {...props} />
      {error && <span className="text-red-500">{error}</span>}
    </div>
  );
};
export default FieldContainer;
