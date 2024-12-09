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
import { EssayStatusType, EssayType } from "../../api/essays";
import { useMutation, useQuery } from "@tanstack/react-query";

import Blank from "../../components/fallback/Blank";
import { Button } from "../../components/ui/button";
import ItemContainer from "../../components/Detail/ItemContainer";
import { Label } from "../../components/ui/label";
import UIErrorBoundary from "../../components/fallback/UIErrorBoundary";
import deleteEssay from "../../api/essays/deleteEssay";
import essayQueryOptions from "../../queries/essayQueryOptions";
import { queryClient } from "../../App";
import sprite from "../../assets/SVGsprite.svg";
import updateEssayStatus from "../../api/essays/updateEssayStatus";
import { useLoaderData } from "react-router-dom";

export default function EssayDetail() {
  return (
    <UIErrorBoundary>
      <APIErrorProvider>
        <APILoadingProvider>
          <EssayDetailContent />
        </APILoadingProvider>
      </APIErrorProvider>
    </UIErrorBoundary>
  );
}

function EssayDetailContent() {
  const { setAPIError } = useAPIError();
  const { setAPILoading, clearAPILoading } = useAPILoading();
  const { data: essayData, id } = useLoaderData<{
    data: EssayType;
    id: number;
  }>();

  const { data, error, isLoading } = useQuery({
    ...essayQueryOptions.getEssayDetail({ id }),
    initialData: essayData,
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteEssay(id),
    onMutate: () => {
      setAPILoading();
    },
    onSuccess: () => {
      clearAPILoading();
      const queryKey = essayQueryOptions.getEssayDetail({ id }).queryKey;
      queryClient.resetQueries({ queryKey });
    },
    onError: (error: Error) => {
      clearAPILoading();
      setAPIError(error.message || "에세이 삭제 중 오류가 발생했습니다.");
    },
  });

  const updateStatusTypeMutation = useMutation({
    mutationFn: (status: EssayStatusType) => updateEssayStatus(id, status),
    onMutate: () => {
      setAPILoading();
    },
    onSuccess: () => {
      clearAPILoading();
      const queryKey = essayQueryOptions.getEssayDetail({ id }).queryKey;
      queryClient.resetQueries({ queryKey });
    },
    onError: (error: Error) => {
      clearAPILoading();
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

  const onClickDeleteEssayButton = () => {
    deleteMutation.mutate();
  };

  const onClickUpdateStatusButton = (status: EssayStatusType) => {
    updateStatusTypeMutation.mutate(status);
  };

  return (
    <div>
      <div className="flex flex-col gap-[20px] relative">
        <div className="grid grid-cols-3">
          <ItemContainer label="작성자 ID">
            <div>{data.author.id}</div>
          </ItemContainer>
          <ItemContainer label="작성자 닉네임">
            <div>{data.author.nickname}</div>
          </ItemContainer>
          <ItemContainer label="작성자 이름">
            <div>{data.author.email}</div>
          </ItemContainer>
        </div>
        <div className="grid grid-cols-4">
          <ItemContainer label="에세이 ID">
            <div>{data.id}</div>
          </ItemContainer>
          <ItemContainer label="에세이 상태">
            <div className="flex gap-[10px]">
              <div>{data.status}</div>
              <Dialog>
                <DialogTrigger>
                  <Button variant="secondary">변경</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>에세이 상태 변경하기</DialogTitle>
                    <DialogDescription className="flex justify-evenly">
                      <Button
                        className="w-[100px]"
                        onClick={() => onClickUpdateStatusButton("published")}
                      >
                        공개
                      </Button>
                      <Button
                        className="w-[100px]"
                        onClick={() => onClickUpdateStatusButton("private")}
                      >
                        비공개
                      </Button>
                      <Button
                        className="w-[100px]"
                        onClick={() => onClickUpdateStatusButton("linkedout")}
                      >
                        링크드아웃
                      </Button>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </ItemContainer>
          <ItemContainer label="조회 수">
            <div>{data.views}</div>
          </ItemContainer>
          <ItemContainer label="레포트 수">
            <div>{data.reports.length}</div>
          </ItemContainer>
        </div>
        <ItemContainer label="제목">
          <div>{data.title}</div>
        </ItemContainer>
        <ItemContainer label="내용">
          <div dangerouslySetInnerHTML={{ __html: data.content }} />
        </ItemContainer>
        <div className="absolute right-0 bottom-0">
          <Dialog>
            <DialogTrigger>
              <Button variant="destructive">
                <svg width={30} height={30}>
                  <use href={`${sprite}#trash`}></use>
                </svg>
                삭제
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>에세이를 삭제하시겠습니까?</DialogTitle>
                <DialogDescription className="flex flex-col gap-[20px] justify-center">
                  <div>한번 삭제한 에세이는 되돌릴 수 없습니다.</div>
                  <Button
                    variant="destructive"
                    onClick={onClickDeleteEssayButton}
                  >
                    삭제하기
                  </Button>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <hr className="my-[20px] border" />
      <div>
        <DetailList label="스토리 목록" id="stories" />
        <DetailList label="리뷰 목록" id="review" />
        <DetailList label="레포트 목록" id="report" />
      </div>
    </div>
  );
}

type DetailListProps = { label: string; id: string };

function DetailList({ label, id }: DetailListProps) {
  return (
    <div id={id} className="col">
      <Label>{label}</Label>
      <Blank />
    </div>
  );
}
