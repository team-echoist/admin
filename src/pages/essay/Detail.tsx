import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { useMutation, useQuery } from "@tanstack/react-query";

import { Button } from "../../components/ui/button";
import Container from "./_components/Container";
import { DefaultPaths } from "../../router/paths";
import { EssayStatusType } from "../../api/essays";
import ItemContainer from "../../components/Detail/ItemContainer";
import ReportBox from "./_components/ReportBox";
import UIErrorBoundary from "../../components/fallback/UIErrorBoundary";
import deleteEssay from "../../api/essays/deleteEssay";
import essayQueryOptions from "../../queries/essayQueryOptions";
import { getParamsFromPath } from "../../lib/path.utils";
import { queryClient } from "../../App";
import sprite from "../../assets/SVGsprite.svg";
import updateEssayStatus from "../../api/essays/updateEssayStatus";
import { useLocation } from "react-router-dom";

export default function EssayDetail() {
  return (
    <UIErrorBoundary>
      <EssayDetailContent />
    </UIErrorBoundary>
  );
}

function EssayDetailContent() {
  const { pathname } = useLocation();
  const id = +getParamsFromPath(DefaultPaths.ESSAY.DETAIL, pathname);

  const { data, error, isLoading } = useQuery({
    ...essayQueryOptions.getEssayDetail({ id }),
  });

  const { data: reportData } = useQuery({
    ...essayQueryOptions.getReportDetail({ id }),
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteEssay(id),

    onSuccess: () => {
      const queryKey = essayQueryOptions.getEssayDetail({ id }).queryKey;
      queryClient.resetQueries({ queryKey });
    },
  });

  const updateStatusTypeMutation = useMutation({
    mutationFn: (status: EssayStatusType) => updateEssayStatus(id, status),

    onSuccess: () => {
      const queryKey = essayQueryOptions.getEssayDetail({ id }).queryKey;
      queryClient.resetQueries({ queryKey });
    },
  });

  if (isLoading) {
    return;
  }
  if (error instanceof Error) {
    return;
  }

  if (!data || !reportData) {
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
        <Container label="레포트 목록">
          {reportData &&
            reportData.length !== 0 &&
            reportData.map((report) => (
              <ReportBox key={report.reporterId} {...report} />
            ))}
        </Container>
      </div>
    </div>
  );
}
