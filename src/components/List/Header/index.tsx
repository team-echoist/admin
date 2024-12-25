type HeaderProps = {
  label?: string;
  totalCount: number;
  sub?: string;
} & React.PropsWithChildren;

export default function Header({
  totalCount,
  label,
  children,
  sub,
}: HeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <div>
        총 {label} 수 {totalCount} {sub ? `/ ${sub}` : ""}
      </div>
      {children}
    </div>
  );
}
