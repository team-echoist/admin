import { cn } from "../../../lib/utils";

type ColumnContainerProps = {
  headers: string[];
  row: number;
  className?: string;
};

export default function ColumnContainer({
  headers,
  row,
  className,
}: ColumnContainerProps) {
  return (
    <div
      className={cn(
        `border-b-[2px] border-lightBlue grid grid-cols-${row}`,
        className
      )}
    >
      {headers.map((header, index) => (
        <div key={index} className={cn("text-center")}>
          {header}
        </div>
      ))}
    </div>
  );
}
