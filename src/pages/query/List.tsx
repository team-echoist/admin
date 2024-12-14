import Blank from "../../components/fallback/Blank";
import ErrorFallback from "../../components/fallback/ErrorFallback";
import { Link } from "react-router-dom";
import List from "../../components/List";
import LoadingFallback from "../../components/fallback/LoadingFallback";
import Pagination from "../../components/Pagination";
import { QueryListType } from "../../api/query";
import UIErrorBoundary from "../../components/fallback/UIErrorBoundary";
import queryQueryOptions from "../../queries/queryQueryOptions";
import usePagination from "../../components/Pagination/usePagination";
import { useQuery } from "@tanstack/react-query";

export default function QueryList() {
  return (
    <UIErrorBoundary>
      <QueryListContent />
    </UIErrorBoundary>
  );
}

const QueryListContent = () => {
  const { currentPage, handlePaginationEvent } = usePagination();

  const { data, error, isLoading } = useQuery({
    ...queryQueryOptions.getQueryList({
      pagination: { page: currentPage, perPage: 10 },
    }),
  });

  if (isLoading) {
    return <LoadingFallback />;
  }
  if (error instanceof Error) {
    return <ErrorFallback />;
  }

  if (!data) {
    return null;
  }

  return (
    <List>
      <List.Header totalCount={data.total} label="공지사항" />

      <List.ColumnContainer headers={[]} row={5} />
      {data.quleroquisDto.length === 0 ? (
        <Blank />
      ) : (
        <List.RowContainer row={10}>
          {data.quleroquisDto.map((query) => (
            <QueryListItem key={query.id} {...query} />
          ))}
        </List.RowContainer>
      )}
      <Pagination
        totalPages={data.totalPage}
        currentPage={currentPage}
        handlePaginationEvent={handlePaginationEvent}
      />
    </List>
  );
};

type QueryListItemProps = QueryListType;

const QueryListItem = ({ id }: QueryListItemProps) => {
  return (
    <Link
      to={`/queries/${id}`}
      className="grid grid-cols-5 items-center h-[50px] m-[10px] hover:bg-lightGray rounded-[8px]"
    >
      <div className="text-center">{id}</div>
    </Link>
  );
};
