import { Label } from "../../ui/label";
import { PropsWithChildren } from "react";
import { cn } from "../../../lib/utils";

type ItemContainerProps = {
  label: string;
  className?: string;
} & PropsWithChildren;

export default function ItemContainer({
  label,
  children,
  className,
}: ItemContainerProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      <Label className="flex-shrink-0">{label}</Label>
      {children}
    </div>
  );
}
