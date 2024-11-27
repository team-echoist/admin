import { Link, useLoaderData } from "react-router-dom";

import { AxiosResponse } from "axios";
import ErrorFallback from "../../components/fallback/ErrorFallback";
import { EssayListType } from "../../api/essays";
import List from "../../components/List";
import LoadingFallback from "../../components/fallback/LoadingFallback";
import Pagination from "../../components/Pagination";
import essayQueryOptions from "../../queries/essayQueryOptions";
import usePagination from "../../components/Pagination/usePagination";
import { useQuery } from "@tanstack/react-query";

const EssayListColumns = ["ID", "에세이 제목", "저자", "발행일자", "조회수"];

const EssayList = () => {
  const initialData = useLoaderData() as AxiosResponse;
  const { currentPage, goToNext, goToPrev, goToPageIndex } = usePagination();

  const { data, error, isLoading } = useQuery({
    ...essayQueryOptions.getEssayList({
      pagination: { page: currentPage, perPage: 10 },
    }),
    initialData,
  });

  if (isLoading) return <LoadingFallback />;
  if (error instanceof Error) return <ErrorFallback />;

  return (
    <main>
      <List>
        <List.Header totalCount={data.data.data.total} label="에세이" />
        <List.ColumnContainer headers={EssayListColumns} row={5} />
        <List.RowContainer>
          {data.data.data.essays.map((essay) => (
            <EssayListItem key={essay.id} {...essay} />
          ))}
        </List.RowContainer>
        <Pagination
          totalPages={data.data.data.total}
          currentPage={currentPage}
          goToNext={goToNext}
          goToPrev={goToPrev}
          goToPageIndex={goToPageIndex}
        />
      </List>
    </main>
  );
};

export default EssayList;

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
