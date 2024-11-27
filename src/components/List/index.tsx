import ColumnContainer from "./ColumnContainer";
import Header from "./Header";
import RowContainer from "./RowContainer";

export default function List({ children }: React.PropsWithChildren) {
  return <div className="flex flex-col gap-[15px]">{children}</div>;
}

List.Header = Header;
List.ColumnContainer = ColumnContainer;
List.RowContainer = RowContainer;
