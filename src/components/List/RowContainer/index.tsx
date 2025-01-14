import Blank from "../../fallback/Blank";
import { PropsWithChildren } from "react";
import { cn } from "../../../lib/utils";
import { hasValidChildren } from "../../../lib/node.utils";

type RowContainerProps = {
  row: number;
  className?: string;
} & PropsWithChildren;

export default function RowContainer({
  row,
  className,
  children,
}: RowContainerProps) {
  if (!hasValidChildren(children)) {
    return <Blank />;
  }

  return (
    <div className={cn(`grid grid-rows-${row}`, className)}>{children}</div>
  );
}
