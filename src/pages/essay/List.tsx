import APIErrorProvider, {
  useAPIError,
} from "../../components/fallback/APIErrorProvider";
import { Link, useLoaderData } from "react-router-dom";

import APILoadingProvider from "../../components/fallback/APILoadingProvider";
import { EssayListResponseType } from "../../api/essays/getEssayList";
import { EssayListType } from "../../api/essays";
import List from "../../components/List";
import LoadingFallback from "../../components/fallback/LoadingFallback";
import Pagination from "../../components/Pagination";
import UIErrorBoundary from "../../components/fallback/UIErrorBoundary";
import essayQueryOptions from "../../queries/essayQueryOptions";
import usePagination from "../../components/Pagination/usePagination";
import { useQuery } from "@tanstack/react-query";

const EssayListColumns = ["ID", "에세이 제목", "저자", "발행일자", "조회수"];

export default function EssayList() {
  return (
    <UIErrorBoundary>
      <APIErrorProvider>
        <APILoadingProvider>
          <EssayListContent />
        </APILoadingProvider>
      </APIErrorProvider>
    </UIErrorBoundary>
  );
}

const EssayListContent = () => {
  const { setAPIError } = useAPIError();
  const initialData = useLoaderData<EssayListResponseType>();
  const { currentPage, handlePaginationEvent } = usePagination(
    initialData.totalPage
  );

  const { data, error, isLoading } = useQuery({
    ...essayQueryOptions.getEssayList({
      pagination: { page: currentPage, perPage: 10 },
    }),
    initialData: { data: initialData },
  });

  if (isLoading) return <LoadingFallback />;
  if (error instanceof Error) {
    setAPIError(error.message);
    return;
  }

  return (
    <List>
      <List.Header totalCount={data.data.total} label="에세이" />
      <List.ColumnContainer headers={EssayListColumns} row={5} />
      <List.RowContainer>
        {data.data.essays.map((essay) => (
          <EssayListItem key={essay.id} {...essay} />
        ))}
      </List.RowContainer>
      <Pagination
        totalPages={data.data.totalPage}
        currentPage={currentPage}
        handlePaginationEvent={handlePaginationEvent}
      />
    </List>
  );
};

type EssayListItemProps = EssayListType;

const EssayListItem = ({
  id,
  title,
  author,
  createdDate,
  views,
}: EssayListItemProps) => {
  return (
    <div className="grid grid-cols-5 h-[50px]">
      <div className="text-center">{id}</div>
      <Link className="text-center" to={`/essays/${id}`}>
        {title}
      </Link>
      <div className="text-center">{author.nickname}</div>
      <div className="text-center">{createdDate}</div>
      <div className="text-center">{views}</div>
    </div>
  );
};
