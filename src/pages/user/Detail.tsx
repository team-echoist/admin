import APIErrorProvider, {
  useAPIError,
} from "../../components/fallback/APIErrorProvider";
import APILoadingProvider, {
  useAPILoading,
} from "../../components/fallback/APILoadingProvider";
import { Dialog, DialogTrigger } from "../../components/ui/dialog";

import { Button } from "../../components/ui/button";
import DeleteDialog from "./DeleteDialog";
import ItemContainer from "../../components/Detail/ItemContainer";
import UIErrorBoundary from "../../components/fallback/UIErrorBoundary";
import { UserType } from "../../api/user";
import sprite from "../../assets/SVGsprite.svg";
import { useLoaderData } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import userQueryOptions from "../../queries/userQueryOptions";

export default function UserDetail() {
  return (
    <UIErrorBoundary>
      <APIErrorProvider>
        <APILoadingProvider>
          <UserDetailContent />
        </APILoadingProvider>
      </APIErrorProvider>
    </UIErrorBoundary>
  );
}

function UserDetailContent() {
  const { setAPIError } = useAPIError();
  const { setAPILoading } = useAPILoading();
  const { data: userData, id } = useLoaderData<{
    data: UserType;
    id: number;
  }>();

  const { data, error, isLoading } = useQuery({
    ...userQueryOptions.getUserDetail({ id }),
    initialData: userData,
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
        <div className="grid grid-cols-3 gap-[20px]">
          <ItemContainer label="사용자 ID">
            <div>{data.id}</div>
          </ItemContainer>
          <ItemContainer label="사용자 이메일">
            <div>{data.email}</div>
          </ItemContainer>
          <ItemContainer label="사용자 닉네임">
            <div>{data.nickname}</div>
          </ItemContainer>
        </div>
        <div className="grid grid-cols-3 gap-[20px]">
          <ItemContainer label="계정상태">
            <div>{data.status}</div>
          </ItemContainer>
          <ItemContainer label="평판">
            <div>{data.reputation}</div>
          </ItemContainer>
          <ItemContainer label="사용자 성별">
            <div>{data.gender}</div>
          </ItemContainer>
          <ItemContainer label="사용자 생년월일">
            <div>{data.birthDate}</div>
          </ItemContainer>
          <ItemContainer label="사용자 역할">
            <div>{data.role}</div>
          </ItemContainer>
        </div>
        <div className="grid grid-cols-3 gap-[20px]">
          <ItemContainer label="프로필 이미지">
            <img
              src={data.profileImage}
              alt={`${data.nickname}의 프로필 이미지`}
              width={200}
              height={200}
            />
          </ItemContainer>
          <div className="grid grid-rows-2 gap-[20px]">
            <ItemContainer label="플랫폼 ID">
              <div>{data.platformId}</div>
            </ItemContainer>
            <ItemContainer label="플랫폼 유형">
              <div>{data.platform}</div>
            </ItemContainer>
          </div>
          <div className="grid grid-rows-4 gap-[20px]">
            <ItemContainer label="계정 비활성화 날짜">
              <div>{data.deactivationDate}</div>
            </ItemContainer>
            <ItemContainer label="구독 종료 날짜">
              <div>{data.role}</div>
            </ItemContainer>
            <ItemContainer label="계정 생성 날짜">
              <div>{data.createdDate}</div>
            </ItemContainer>
            <ItemContainer label="계정 삭제 날짜">
              <div>{data.deletedDate}</div>
            </ItemContainer>
          </div>
        </div>
        <Dialog>
          <DialogTrigger className="flex justify-end">
            <Button variant="destructive">
              <svg width={30} height={30}>
                <use href={`${sprite}#trash`}></use>
              </svg>
              계정 삭제하기
            </Button>
          </DialogTrigger>
          <DeleteDialog id={data.id} email={data.email} />
        </Dialog>
      </div>
    </div>
  );
}
