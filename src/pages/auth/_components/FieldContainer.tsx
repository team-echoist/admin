import { InputHTMLAttributes } from "react";

type FieldContainerProps = {
  label: string;
} & InputHTMLAttributes<HTMLInputElement>;

const FieldContainer = ({ label, value, onChange }: FieldContainerProps) => {
  return (
    <div className="flex flex-col w-[300px]">
      <label>{label}</label>
      <input className="border p-[5px]" value={value} onChange={onChange} />
    </div>
  );
};

export default FieldContainer;
