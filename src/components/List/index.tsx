import ColumnContainer from "./ColumnContainer";
import Header from "./Header";
import RowContainer from "./RowContainer";

export default function List({ children }: React.PropsWithChildren) {
  return <article className="flex flex-col gap-[15px]">{children}</article>;
}

List.Header = Header;
List.ColumnContainer = ColumnContainer;
List.RowContainer = RowContainer;
