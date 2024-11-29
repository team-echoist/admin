import APIErrorProvider, {
  useAPIError,
} from "../../components/fallback/APIErrorProvider";
import APILoadingProvider, {
  useAPILoading,
} from "../../components/fallback/APILoadingProvider";

import List from "../../components/List";
import { ManagerLogResponseType } from "../../api/manager/getManagerLog";
import { ManagerLogType } from "../../api/manager";
import Pagination from "../../components/Pagination";
import UIErrorBoundary from "../../components/fallback/UIErrorBoundary";
import managerQueryOptions from "../../queries/managerQueryOptions";
import { useLoaderData } from "react-router-dom";
import usePagination from "../../components/Pagination/usePagination";
import { useQuery } from "@tanstack/react-query";

export default function ManagerLog() {
  return (
    <UIErrorBoundary>
      <APIErrorProvider>
        <APILoadingProvider>
          <ManagerLogContent />
        </APILoadingProvider>
      </APIErrorProvider>
    </UIErrorBoundary>
  );
}

const columns = ["로그 ID", "활동 내용", "관리자명", "비고"];

const ManagerLogContent = () => {
  const { setAPIError } = useAPIError();
  const { setAPILoading } = useAPILoading();
  const initialData = useLoaderData<ManagerLogResponseType>();
  const { currentPage, handlePaginationEvent } = usePagination(
    initialData.totalPage
  );

  const { data, error, isLoading } = useQuery({
    ...managerQueryOptions.getManagerLog({
      pagination: { page: currentPage, perPage: 10 },
    }),
    initialData,
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
      <List.Header totalCount={data.total} label="관리자 기록" />
      <List.ColumnContainer headers={columns} row={4} />
      <List.RowContainer row={10}>
        {data.histories.map((log) => (
          <LogListItem key={log.id} {...log} />
        ))}
      </List.RowContainer>
      <Pagination
        totalPages={data.totalPage}
        currentPage={currentPage}
        handlePaginationEvent={handlePaginationEvent}
      />
    </List>
  );
};

function LogListItem({
  id,
  target,
  actionType,
  processor,
  processedDate,
}: ManagerLogType) {
  const targetFormatted = getTarget(target);
  const actionFormatted = getAction(actionType);

  return (
    <div className="grid grid-cols-4 items-center h-[50px] m-[10px] rounded-[8px]">
      <div className="text-center">{id}</div>

      <div className="text-center">
        {targetFormatted}(을)를 {actionFormatted}
      </div>
      <div className="text-center">{processor.name}</div>
      <div className="text-center">{processedDate}</div>
    </div>
  );
}

function getTarget(target: string) {
  switch (target) {
    case "report":
      return "레포트";
    case "review":
      return "리뷰";
    case "essay":
      return "에세이";
    case "user":
      return "사용자";
    case "notice":
      return "공지사항";
    default:
      return target;
  }
}

function getAction(action: string) {
  switch (action) {
    case "approved":
      return "승인함";
    case "rejected":
      return "거절함";
    case "public":
      return "공개로 변경함";
    case "unpublished":
      return "비공개로 변경함";
    case "unlinkedout":
      return "링크드아웃 취소함";
    case "deleted":
      return "삭제함";
    case "updated":
      return "업데이트함";
    default:
      return action;
  }
}
