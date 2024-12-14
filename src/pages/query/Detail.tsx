import APIErrorProvider, {
  useAPIError,
} from "../../components/fallback/APIErrorProvider";
import APILoadingProvider, {
  useAPILoading,
} from "../../components/fallback/APILoadingProvider";

import ItemContainer from "../../components/Detail/ItemContainer";
import UIErrorBoundary from "../../components/fallback/UIErrorBoundary";
import queryQueryOptions from "../../queries/queryQueryOptions";
import { useQuery } from "@tanstack/react-query";

export default function QueryDetail() {
  return (
    <UIErrorBoundary>
      <APIErrorProvider>
        <APILoadingProvider>
          <QueryDetailContent />
        </APILoadingProvider>
      </APIErrorProvider>
    </UIErrorBoundary>
  );
}

function QueryDetailContent() {
  const { setAPIError } = useAPIError();
  const { setAPILoading } = useAPILoading();

  const { data, error, isLoading } = useQuery({
    ...queryQueryOptions.getQueryDetail({ id: 1 }),
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
      <h3 className="text-2xl">문의사항 세부사항</h3>
      <div className="flex flex-col gap-[20px] relative max-w-[1200px]">
        <div className="grid grid-cols-2">
          <ItemContainer label="문의사항 ID">
            <div>{data?.id}</div>
          </ItemContainer>
        </div>
      </div>
    </article>
  );
}
