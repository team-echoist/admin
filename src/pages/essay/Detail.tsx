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

import Blank from "../../components/fallback/Blank";
import { Button } from "../../components/ui/button";
import { EssayType } from "../../api/essays";
import ItemContainer from "../../components/Detail/ItemContainer";
import { Label } from "../../components/ui/label";
import UIErrorBoundary from "../../components/fallback/UIErrorBoundary";
import essayQueryOptions from "../../queries/essayQueryOptions";
import { useLoaderData } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

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
  const { setAPILoading } = useAPILoading();
  const { data: essayData, id } = useLoaderData<{
    data: EssayType;
    id: number;
  }>();

  const { data, error, isLoading } = useQuery({
    ...essayQueryOptions.getEssayDetail({ id }),
    initialData: essayData,
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
            <div className="flex">
              <div>{data.status}</div>
              <Dialog>
                <DialogTrigger>
                  <Button>변경</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>에세이 상태 변경하기</DialogTitle>
                    <DialogDescription className="flex justify-evenly">
                      <Button className="w-[100px]">공개</Button>
                      <Button className="w-[100px]">비공개</Button>
                      <Button className="w-[100px]">링크드아웃</Button>
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
              <Button>삭제</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>에세이를 삭제하시겠습니까?</DialogTitle>
                <DialogDescription className="flex justify-center">
                  <Button className="w-[100px]">삭제하기</Button>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <hr className="my-[20px] border" />
      <div>
        <DetailList label="스토리 목록" />
        <DetailList label="리뷰 목록" />
        <DetailList label="레포트 목록" />
      </div>
    </div>
  );
}

type DetailListProps = { label: string };

function DetailList({ label }: DetailListProps) {
  return (
    <div className="col">
      <Label>{label}</Label>
      <Blank />
    </div>
  );
}
