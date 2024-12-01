import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";

import { Button } from "../../components/ui/button";
import InfoEditForm from "./InfoEditForm";
import ItemContainer from "../../components/Detail/ItemContainer";
import authQueryOptions from "../../queries/authQueryOptions";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function MyPage() {
  return <MyPageContent />;
}

function MyPageContent() {
  const [isProfileEditFormOpen, setIsProfileEditFormOpen] = useState(false);
  const { data } = useQuery({
    ...authQueryOptions.getMyInfo(),
  });

  if (!data) return;

  return (
    <main className="m-[40px] flex flex-col gap-[40px]">
      <h3 className="text-2xl">내 프로필</h3>
      <div className="flex gap-[120px] relative w-[700px]">
        <Dialog
          open={isProfileEditFormOpen}
          onOpenChange={setIsProfileEditFormOpen}
        >
          <DialogTrigger className="absolute right-0 top-0">
            <Button>프로필 수정하기</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>나의 프로필 수정하기</DialogTitle>
              <DialogDescription>
                <InfoEditForm
                  onCloseFormDialog={() => {
                    setIsProfileEditFormOpen(false);
                  }}
                />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
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
        <div>
          <ItemContainer label="나의 ID">
            <div>{data.id}</div>
          </ItemContainer>
          <ItemContainer label="나의 이메일">
            <div>{data.email}</div>
          </ItemContainer>
          <ItemContainer label="나의 이름">
            <div>{data.name}</div>
          </ItemContainer>
          <ItemContainer label="비고">
            <div>{data.info}</div>
          </ItemContainer>
        </div>
      </div>
    </main>
  );
}
