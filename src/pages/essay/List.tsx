import APIErrorProvider, {
  useAPIError,
} from "../../components/fallback/APIErrorProvider";
import APILoadingProvider, {
  useAPILoading,
} from "../../components/fallback/APILoadingProvider";
import { Link, useLoaderData } from "react-router-dom";

import { EssayListResponseType } from "../../api/essays/getEssayList";
import { EssayListType } from "../../api/essays";
import KeywordSearch from "../../components/Filter/KeywordSearch";
import List from "../../components/List";
import Pagination from "../../components/Pagination";
import UIErrorBoundary from "../../components/fallback/UIErrorBoundary";
import essayQueryOptions from "../../queries/essayQueryOptions";
import usePagination from "../../components/Pagination/usePagination";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

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
  const { setAPILoading } = useAPILoading();
  const initialData = useLoaderData<EssayListResponseType>();
  const [essaySearchKeyword, setEssaySearchKeyword] = useState("");
  const { currentPage, handlePaginationEvent } = usePagination(
    initialData.totalPage
  );

  const { data, error, isLoading } = useQuery({
    ...essayQueryOptions.getEssayList({
      pagination: { page: currentPage, perPage: 10 },
      filter: { keyword: essaySearchKeyword },
    }),
    initialData: { data: initialData },
  });

  if (isLoading) {
    setAPILoading();
    return;
  }
  if (error instanceof Error) {
    setAPIError(error.message);
    return;
  }

  return (
    <List>
      <List.Header totalCount={data.data.total} label="에세이">
        <KeywordSearch
          keyword={essaySearchKeyword}
          onKeywordChange={setEssaySearchKeyword}
        />
      </List.Header>
      <List.ColumnContainer headers={EssayListColumns} row={5} />
      <List.RowContainer row={10}>
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
    <Link
      to={`/essays/${id}`}
      className="grid grid-cols-5 items-center h-[50px] m-[10px] hover:bg-lightGray rounded-[8px]"
    >
      <div className="text-center">{id}</div>
      <div className="text-center">{title}</div>
      <div className="text-center">{author?.nickname}</div>
      <div className="text-center">{createdDate}</div>
      <div className="text-center">{views}</div>
    </Link>
  );
};
