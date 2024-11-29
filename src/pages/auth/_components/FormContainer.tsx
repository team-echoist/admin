import { FormHTMLAttributes, PropsWithChildren } from "react";

import { Button } from "../../../components/ui/button";
import { cn } from "../../../lib/utils";
import logo from "../../../assets/black_logo.png";

type FormContainerProps = PropsWithChildren<{
  move?: { label: string; to: string };
}> &
  FormHTMLAttributes<HTMLFormElement>;

const FormContainer = ({ children, onSubmit, move }: FormContainerProps) => {
  return (
    <form
      onSubmit={onSubmit}
      className={cn(
        "p-[30px] bg-white rounded-[8px]",
        "flex flex-col gap-[20px] items-center"
      )}
    >
      <div className="rounded-[20px] overflow-hidden">
        <img src={logo} alt="링크드아웃 로고" width={150} />
      </div>

      {children}
      <Button type="submit" className="w-full">
        제출
      </Button>
      {move && (
        <a href={move.to} className="underline">
          {move.label}
        </a>
      )}
    </form>
  );
};

export default FormContainer;
