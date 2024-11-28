import "react-quill-new/dist/quill.snow.css";

import APIErrorProvider, {
  useAPIError,
} from "../../components/fallback/APIErrorProvider";
import APILoadingProvider, {
  useAPILoading,
} from "../../components/fallback/APILoadingProvider";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Link, useLoaderData } from "react-router-dom";

import Blank from "../../components/fallback/Blank";
import { Button } from "../../components/ui/button";
import { DialogHeader } from "../../components/ui/dialog";
import List from "../../components/List";
import NoticeForm from "./NoticeForm";
import { NoticeListResponseType } from "../../api/notices/getNoticeList";
import { NoticeType } from "../../api/notices";
import Pagination from "../../components/Pagination";
import UIErrorBoundary from "../../components/fallback/UIErrorBoundary";
import noticeQueryOptions from "../../queries/noticeQueryOptions";
import usePagination from "../../components/Pagination/usePagination";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

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
  const [isNoticeFormDialogOpen, setIsNoticeFormDialogOpen] = useState(false);
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

  const onCloseNoticeFormDialog = () => {
    setIsNoticeFormDialogOpen(false);
  };

  return (
    <List>
      <List.Header totalCount={data.total} label="공지사항">
        <Dialog
          open={isNoticeFormDialogOpen}
          onOpenChange={setIsNoticeFormDialogOpen}
        >
          <DialogTrigger>
            <Button onClick={() => setIsNoticeFormDialogOpen(true)}>
              공지사항 작성하기
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>공지사항 작성하기</DialogTitle>
              <DialogDescription className="flex flex-col justify-evenly">
                <NoticeForm onCloseNoticeFormDialog={onCloseNoticeFormDialog} />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </List.Header>
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

const NoticeListItem = ({ id, title }: NoticeListItemProps) => {
  return (
    <Link
      to={`/notices/${id}`}
      className="grid grid-cols-5 items-center h-[50px] m-[10px] hover:bg-gray-300 rounded-[8px]"
    >
      <div className="text-center">{id}</div>
      <div className="text-center">{title}</div>
    </Link>
  );
};
