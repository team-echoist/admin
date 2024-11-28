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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";

import { Button } from "../../components/ui/button";
import { DefaultPaths } from "../../router/paths";
import ItemContainer from "../../components/Detail/ItemContainer";
import { NoticeType } from "../../api/notices";
import UIErrorBoundary from "../../components/fallback/UIErrorBoundary";
import deleteNotice from "../../api/notices/deleteNotice";
import noticeQueryOptions from "../../queries/noticeQueryOptions";
import { queryClient } from "../../App";
import sprite from "../../assets/SVGsprite.svg";

export default function NoticeDetail() {
  return (
    <UIErrorBoundary>
      <APIErrorProvider>
        <APILoadingProvider>
          <NoticeDetailContent />
        </APILoadingProvider>
      </APIErrorProvider>
    </UIErrorBoundary>
  );
}

function NoticeDetailContent() {
  const { setAPIError } = useAPIError();
  const { setAPILoading } = useAPILoading();
  const navigate = useNavigate();
  const { data: initialData, id } = useLoaderData<{
    data: NoticeType;
    id: number;
  }>();

  const { data, error, isLoading } = useQuery({
    ...noticeQueryOptions.getNoticeDetail({ id }),
    initialData,
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteNotice(id),
    onMutate: () => {
      setAPILoading();
    },
    onSuccess: () => {
      const queryKey = noticeQueryOptions.getNoticeDetail({ id }).queryKey;
      queryClient.invalidateQueries({ queryKey });
      navigate(`/${DefaultPaths.NOTICE.LIST}`);
    },
    onError: (error: Error) => {
      setAPIError(error.message || "에세이 삭제 중 오류가 발생했습니다.");
    },
  });

  if (isLoading) {
    setAPILoading();
    return;
  }
  if (error instanceof Error) {
    setAPIError(error.message);
    return;
  }

  const onClickDeleteNoticeButton = () => {
    deleteMutation.mutate();
  };

  return (
    <article className="flex flex-col gap-[20px]">
      <h3 className="text-2xl">공지사항 세부사항</h3>
      <div className="flex flex-col gap-[20px] relative max-w-[1200px]">
        <div className="grid grid-cols-2">
          <ItemContainer label="공지사항 작성 날짜">
            <div>{data.createdDate}</div>
          </ItemContainer>
          <ItemContainer label="공지사항 작성자">
            <div>{data.processor.name}</div>
          </ItemContainer>
        </div>
        <ItemContainer label="공지사항 제목">
          <div>{data.title}</div>
        </ItemContainer>
        <ItemContainer label="공지사항 내용">
          <div dangerouslySetInnerHTML={{ __html: data.content }} />
        </ItemContainer>
        <div className="absolute right-0 bottom-0">
          <Dialog>
            <DialogTrigger>
              <Button variant="destructive">
                <svg width={30} height={30}>
                  <use href={`${sprite}#trash`}></use>
                </svg>
                공지사항 삭제하기
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>에세이를 삭제하시겠습니까?</DialogTitle>
                <DialogDescription className="flex flex-col gap-[20px] justify-center">
                  <div>한번 삭제한 에세이는 되돌릴 수 없습니다.</div>
                  <Button
                    variant="destructive"
                    onClick={onClickDeleteNoticeButton}
                  >
                    삭제하기
                  </Button>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </article>
  );
}
