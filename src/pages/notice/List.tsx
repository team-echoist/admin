import APIErrorProvider, {
  useAPIError,
} from "../../components/fallback/APIErrorProvider";
import APILoadingProvider, {
  useAPILoading,
} from "../../components/fallback/APILoadingProvider";
import { Link, useLoaderData } from "react-router-dom";

import Blank from "../../components/fallback/Blank";
import List from "../../components/List";
import { NoticeListResponseType } from "../../api/notices/getNoticeList";
import { NoticeType } from "../../api/notices";
import Pagination from "../../components/Pagination";
import UIErrorBoundary from "../../components/fallback/UIErrorBoundary";
import noticeQueryOptions from "../../queries/noticeQueryOptions";
import usePagination from "../../components/Pagination/usePagination";
import { useQuery } from "@tanstack/react-query";

export default function NoticeList() {
  return (
    <UIErrorBoundary>
      <APIErrorProvider>
        <APILoadingProvider>
          <NoticeListContent />
        </APILoadingProvider>
      </APIErrorProvider>
    </UIErrorBoundary>
  );
}

const NoticeListContent = () => {
  const { setAPIError } = useAPIError();
  const { setAPILoading } = useAPILoading();
  const initialData = useLoaderData<NoticeListResponseType>();
  const { currentPage, handlePaginationEvent } = usePagination(
    initialData.totalPage
  );

  const { data, error, isLoading } = useQuery({
    ...noticeQueryOptions.getNoticeList({
      pagination: { page: currentPage, perPage: 10 },
    }),
    initialData: initialData,
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
      <List.Header totalCount={data.total} label="공지사항" />
      <List.ColumnContainer headers={[]} row={5} />
      {data.Notices.length === 0 ? (
        <Blank />
      ) : (
        <List.RowContainer row={10}>
          {data.Notices.map((notice) => (
            <NoticeListItem key={notice.id} {...notice} />
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

type NoticeListItemProps = NoticeType;

const NoticeListItem = ({ id, title, author }: NoticeListItemProps) => {
  return (
    <Link
      to={`/notices/${id}`}
      className="grid grid-cols-5 items-center h-[50px] m-[10px] hover:bg-gray-300 rounded-[8px]"
    >
      <div className="text-center">{id}</div>
      <div className="text-center">{title}</div>
      <div className="text-center">{author.nickname}</div>
    </Link>
  );
};
