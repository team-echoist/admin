import { FormHTMLAttributes, PropsWithChildren } from "react";

import { Button } from "../../../components/ui/button";
import { cn } from "../../../lib/utils";

type FormContainerProps = PropsWithChildren<{
  move?: { label: string; to: string };
}> &
  FormHTMLAttributes<HTMLFormElement>;

const FormContainer = ({ children, onSubmit, move }: FormContainerProps) => {
  return (
    <form
      onSubmit={onSubmit}
      className={cn("p-[30px] bg-white rounded-[8px]", "flex flex-col")}
    >
      <div className="flex flex-col items-center">링크드아웃</div>
      {children}
      <Button>제출</Button>
      {move && <a href={move.to}>{move.label}</a>}
    </form>
  );
};

export default FormContainer;
