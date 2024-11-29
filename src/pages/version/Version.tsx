import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";

import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { VersionItemType } from "../../api/version/getVersion";
import postVersion from "../../api/version/postVersion";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";

const versionOrder = [
  { label: "안드로이드(태블릿)", dataKey: "android_tablet" },
  { label: "안드로이드(모바일)", dataKey: "android_mobile" },
  { label: "IOS(태블릿)", dataKey: "ios_tablet" },
  { label: "IOS(모바일)", dataKey: "ios_mobile" },
  { label: "데스크탑(MAC)", dataKey: "desktop_mac" },
  { label: "데스크탑(WINDOW)", dataKey: "desktop_windows" },
];

export default function Version() {
  const data = useLoaderData<VersionItemType[]>();

  const sortedVersion = versionOrder.map((el) => ({
    ...el,
    ...data.find((item) => item.appType === el.dataKey),
  })) as VersionItemProps[];

  return (
    <div className="w-[1200px] grid grid-cols-2 gap-[20px]">
      {sortedVersion.map((item) => (
        <VersionItem key={item?.id} {...item} />
      ))}
    </div>
  );
}

type VersionItemProps = { label: string } & VersionItemType;

function VersionItem({ id, label, version, releaseDate }: VersionItemProps) {
  const [isOpenVersionEditDialog, setIsOpenVersionEditDialog] = useState(false);

  const { register, handleSubmit, reset } = useForm<{ version: string }>();

  const onSubmit = async ({ version }: { version: string }) => {
    try {
      await postVersion(id, version);
      reset();
      setIsOpenVersionEditDialog(false);
    } catch (e) {
      alert(e);
    }
  };
  return (
    <div className="relative border p-[40px] rounded-[8px] flex flex-col gap-[10px]">
      <div className="text-xl">{label}</div>
      <div className="flex flex-col gap-[5px]">
        <Item label="현재 배포 버전" value={version} />
        <Item label="최근 업데이트 날짜" value={releaseDate} />
      </div>
      <Dialog
        open={isOpenVersionEditDialog}
        onOpenChange={setIsOpenVersionEditDialog}
      >
        <DialogTrigger className="absolute right-[30px] bottom-[30px]">
          <Button>버전 업데이트</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{label} 버전 업데이트하기</DialogTitle>
            <DialogDescription>
              <form
                className="flex flex-col justify-evenly gap-[20px]"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div>변경할 앱의 버전을 입력해주세요.</div>
                <Input
                  placeholder="X.X.X 형식의 버전을 입력해주세요"
                  {...register("version")}
                />
                <div className="flex gap-[20px] mt-4">
                  <Button
                    type="button"
                    className="w-full"
                    variant="secondary"
                    onClick={() => {
                      setIsOpenVersionEditDialog(false);
                    }}
                  >
                    지정 취소
                  </Button>
                  <Button type="submit" className="w-full">
                    지정 완료
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

type ItemProps = { label: string; value?: string };

function Item({ label, value }: ItemProps) {
  return (
    <div>
      <div className="text-md font-bold">{label}</div>
      <div>{value}</div>
    </div>
  );
}
