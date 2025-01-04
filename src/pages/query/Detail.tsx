import { DefaultPaths } from "../../router/paths";
import ErrorFallback from "../../components/fallback/ErrorFallback";
import ItemContainer from "../../components/Detail/ItemContainer";
import LoadingFallback from "../../components/fallback/LoadingFallback";
import { getParamsFromPath } from "../../lib/path.utils";
import queryQueryOptions from "../../queries/queryQueryOptions";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export default function QueryDetail() {
  return <QueryDetailContent />;
}

function QueryDetailContent() {
  const { pathname } = useLocation();
  const id = +getParamsFromPath(DefaultPaths.QUERY.DETAIL, pathname).id;

  const { data, error, isLoading } = useQuery({
    ...queryQueryOptions.getQueryDetail({ id }),
  });

  if (isLoading) {
    return <LoadingFallback />;
  }
  if (error instanceof Error) {
    return <ErrorFallback />;
  }

  if (!data) {
    return null;
  }

  return (
    <article className="flex flex-col gap-[20px]">
      <h3 className="text-2xl">문의사항 세부사항</h3>
      <div className="flex flex-col gap-[20px] relative max-w-[1200px]">
        <div className="grid grid-cols-4">
          <ItemContainer label="문의사항 ID">
            <div>{data?.id}</div>
          </ItemContainer>
          <ItemContainer label="문의사항 유형">
            <div>{data?.type}</div>
          </ItemContainer>
          <ItemContainer label="문의사항 작성 유저 닉네임">
            <div>{data.user.nickname}</div>
          </ItemContainer>
          <ItemContainer label="문의사항 작성 유저 이메일">
            <div>{data.user.email}</div>
          </ItemContainer>
        </div>
        <ItemContainer label="문의사항 내용">
          <div dangerouslySetInnerHTML={{ __html: data.content }} />
        </ItemContainer>
      </div>
    </article>
  );
}
