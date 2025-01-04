import Blank from "../../components/fallback/Blank";
import ErrorFallback from "../../components/fallback/ErrorFallback";
import { Link } from "react-router-dom";
import List from "../../components/List";
import LoadingFallback from "../../components/fallback/LoadingFallback";
import Pagination from "../../components/Pagination";
import { QueryListType } from "../../api/query";
import queryQueryOptions from "../../queries/queryQueryOptions";
import usePagination from "../../components/Pagination/usePagination";
import { useQuery } from "@tanstack/react-query";

export default function QueryList() {
  return <QueryListContent />;
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
      <List.Header totalCount={data.total} label="문의사항" />
      <List.ColumnContainer
        headers={[
          "문의사항 번호",
          "문의사항 제목",
          "작성자명",
          "작성일",
          "답변여부",
        ]}
        row={5}
      />
      {data.inquiries.length === 0 ? (
        <Blank />
      ) : (
        <List.RowContainer row={10}>
          {data.inquiries.map((query) => (
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

const QueryListItem = ({
  id,
  title,
  user,
  createdDate,
  processed,
}: QueryListItemProps) => {
  return (
    <Link
      to={`/queries/${id}`}
      className="grid grid-cols-5 items-center h-[50px] m-[10px] hover:bg-lightGray rounded-[8px]"
    >
      <div className="text-center">{id}</div>
      <div className="text-center">{title}</div>
      <div className="text-center">{user.nickname}</div>
      <div className="text-center">{createdDate}</div>
      <div className="text-center">{processed ? "완료" : "미완료"}</div>
    </Link>
  );
};
