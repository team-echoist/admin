import APIErrorProvider, {
  useAPIError,
} from "../../components/fallback/APIErrorProvider";
import APILoadingProvider, {
  useAPILoading,
} from "../../components/fallback/APILoadingProvider";

import ItemContainer from "../../components/Detail/ItemContainer";
import UIErrorBoundary from "../../components/fallback/UIErrorBoundary";
import reportQueryOptions from "../../queries/reportQueryOptions";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export default function ReportDetail() {
  return (
    <UIErrorBoundary>
      <APIErrorProvider>
        <APILoadingProvider>
          <ReportDetailContent />
        </APILoadingProvider>
      </APIErrorProvider>
    </UIErrorBoundary>
  );
}

function ReportDetailContent() {
  const { setAPIError } = useAPIError();
  const { setAPILoading } = useAPILoading();
  const { pathname } = useParams();
  const id = Number(pathname?.split("/")?.[3]);

  const { data, error, isLoading } = useQuery({
    ...reportQueryOptions.getReportDetail({ id }),
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
    <article className="flex flex-col gap-[20px]">
      <h3 className="text-2xl">레포트 세부사항</h3>
      <div className="flex flex-col gap-[20px] relative max-w-[1200px]">
        <div className="grid grid-cols-2">
          <ItemContainer label="레포트 작성 날짜">
            <div>{data?.createdDate}</div>
          </ItemContainer>
        </div>
        <div className="grid grid-cols-2">
          <ItemContainer label="에세이 ID">
            <div>{data?.id}</div>
          </ItemContainer>
          <ItemContainer label="에세이 제목">
            <div>{data?.essayTitle}</div>
          </ItemContainer>
        </div>
        <ItemContainer label="신고 사유">
          <div>{data?.reason}</div>
        </ItemContainer>
      </div>
    </article>
  );
}
