import { PropsWithChildren } from "react";

type RowContainerProps = PropsWithChildren;

export default function RowContainer({ children }: RowContainerProps) {
  return <div>{children}</div>;
}
