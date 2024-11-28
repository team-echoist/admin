import { PropsWithChildren } from "react";
import { cn } from "../../../lib/utils";

type RowContainerProps = {
  row: number;
  className?: string;
} & PropsWithChildren;

export default function RowContainer({
  row,
  className,
  children,
}: RowContainerProps) {
  return (
    <div className={cn(`grid grid-rows-${row}`, className)}>{children}</div>
  );
}
