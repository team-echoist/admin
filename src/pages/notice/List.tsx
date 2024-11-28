import "react-quill-new/dist/quill.snow.css";

import APIErrorProvider, {
  useAPIError,
} from "../../components/fallback/APIErrorProvider";
import APILoadingProvider, {
  useAPILoading,
} from "../../components/fallback/APILoadingProvider";
import { Controller, useForm } from "react-hook-form";
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
import { Input } from "../../components/ui/input";
import ItemContainer from "../../components/Detail/ItemContainer";
import List from "../../components/List";
import { NoticeListResponseType } from "../../api/notices/getNoticeList";
import { NoticeType } from "../../api/notices";
import Pagination from "../../components/Pagination";
import ReactQuill from "react-quill-new";
import UIErrorBoundary from "../../components/fallback/UIErrorBoundary";
import noticeQueryOptions from "../../queries/noticeQueryOptions";
import postNotice from "../../api/notices/postNotice";
import { queryClient } from "../../App";
import usePagination from "../../components/Pagination/usePagination";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const PostNoticeSchema = z.object({
  title: z.string().min(5, { message: "5글자 이상의 제목을 입력해주세요." }),
  content: z
    .string()
    .min(50, { message: "최소 50자 이상의 내용을 입력해주세요." }),
});

type PostNoticeBodyType = z.infer<typeof PostNoticeSchema>;

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

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PostNoticeBodyType>({
    resolver: zodResolver(PostNoticeSchema),
  });

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

  const onClickSubmitNotice = async (data: PostNoticeBodyType) => {
    try {
      await postNotice(data);
      const queryKey = noticeQueryOptions.getNoticeList({
        pagination: { page: 1, perPage: 10 },
      }).queryKey;
      queryClient.invalidateQueries({ queryKey });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <List>
      <List.Header totalCount={data.total} label="공지사항">
        <Dialog>
          <DialogTrigger>
            <Button>공지사항 작성하기</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>공지사항 작성하기</DialogTitle>
              <DialogDescription className="flex flex-col justify-evenly">
                <form onSubmit={handleSubmit(onClickSubmitNotice)}>
                  <ItemContainer label="제목" className="flex-row">
                    <Input
                      placeholder="공지사항의 제목을 입력해주세요"
                      {...register("title")}
                    />
                    {errors.title && (
                      <span className="text-red-500">
                        {errors.title.message}
                      </span>
                    )}
                  </ItemContainer>
                  <ItemContainer label="내용">
                    <Controller
                      name="content"
                      control={control}
                      render={({ field }) => (
                        <ReactQuill
                          {...field}
                          placeholder="공지사항의 내용을 입력해주세요"
                          theme="snow"
                          onChange={(value) => field.onChange(value)}
                        />
                      )}
                    />
                    {errors.content && (
                      <span className="text-red-500">
                        {errors.content.message}
                      </span>
                    )}
                  </ItemContainer>
                  <Button type="submit">작성 완료</Button>
                </form>
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
