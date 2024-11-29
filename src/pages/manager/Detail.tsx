import APIErrorProvider, {
  useAPIError,
} from "../../components/fallback/APIErrorProvider";
import APILoadingProvider, {
  useAPILoading,
} from "../../components/fallback/APILoadingProvider";

import ItemContainer from "../../components/Detail/ItemContainer";
import { ManagerType } from "../../api/manager";
import UIErrorBoundary from "../../components/fallback/UIErrorBoundary";
import managerQueryOptions from "../../queries/managerQueryOptions";
import { useLoaderData } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export default function ManagerDetail() {
  return (
    <UIErrorBoundary>
      <APIErrorProvider>
        <APILoadingProvider>
          <ManagerDetailContent />
        </APILoadingProvider>
      </APIErrorProvider>
    </UIErrorBoundary>
  );
}

function ManagerDetailContent() {
  const { setAPIError } = useAPIError();
  const { setAPILoading } = useAPILoading();
  const { data: initialData, id } = useLoaderData<{
    data: ManagerType;
    id: number;
  }>();

  const { data, error, isLoading } = useQuery({
    ...managerQueryOptions.getManager({ id }),
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
    <div>
      <div className="flex flex-col gap-[20px] relative">
        <ItemContainer label="관리자 ID">
          <div>{data.id}</div>
        </ItemContainer>
        <ItemContainer label="관리자 이메일">
          <div>{data.email}</div>
        </ItemContainer>
        <ItemContainer label="관리자 이름">
          <div>{data.name}</div>
        </ItemContainer>
        <ItemContainer label="프로필 이미지">
          {data.profileImage && (
            <img
              src={data.profileImage}
              alt={`${data.name}의 프로필 이미지`}
              width={200}
              height={200}
            />
          )}
        </ItemContainer>
        <ItemContainer label="비고">
          <div>{data.info}</div>
        </ItemContainer>
      </div>
    </div>
  );
}
