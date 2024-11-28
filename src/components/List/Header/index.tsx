type HeaderProps = {
  label?: string;
  totalCount: number;
} & React.PropsWithChildren;

export default function Header({ totalCount, label, children }: HeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <div>
        총 {label} 수 {totalCount}
      </div>
      {children}
    </div>
  );
}
