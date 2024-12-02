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
import { useMutation, useQuery } from "@tanstack/react-query";

import { AxiosResponse } from "axios";
import { Button } from "../../components/ui/button";
import { GeulroquisCountType } from "../../api/geulroquis/getGeulroquisCount";
import { GeulroquisResponseType } from "../../api/geulroquis/getGeulroquisList";
import { GeulroquisType } from "../../api/geulroquis";
import { Input } from "../../components/ui/input";
import Pagination from "../../components/Pagination";
import UIErrorBoundary from "../../components/fallback/UIErrorBoundary";
import UploadForm from "./UploadForm";
import geulroquisQueryOptions from "../../queries/geulroquisQueryOptions";
import putNextGeulroquis from "../../api/geulroquis/putNextGeulroquis";
import { queryClient } from "../../App";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";
import usePagination from "../../components/Pagination/usePagination";
import { useState } from "react";

export default function GeulroquisList() {
  return (
    <UIErrorBoundary>
      <APIErrorProvider>
        <APILoadingProvider>
          <GeulroquisListContent />
        </APILoadingProvider>
      </APIErrorProvider>
    </UIErrorBoundary>
  );
}

const GeulroquisListContent = () => {
  const { setAPIError } = useAPIError();
  const { setAPILoading } = useAPILoading();
  const [isUploadFormDialogOpen, setIsUploadFormDialogOpen] = useState(false);
  const { data: initialData, count } = useLoaderData<{
    data: GeulroquisResponseType;
    count: GeulroquisCountType;
  }>();
  const { currentPage, handlePaginationEvent } = usePagination();

  const { data, error, isLoading } = useQuery({
    ...geulroquisQueryOptions.getGeulroquisList({
      pagination: { page: currentPage, perPage: 9 },
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
    <article className="flex flex-col items-center gap-[20px]">
      <div className="w-full flex justify-between">
        <div>
          총 글로키 수 {count.total} / 이용가능 글로키수 {count.available}
        </div>
        <Dialog
          open={isUploadFormDialogOpen}
          onOpenChange={setIsUploadFormDialogOpen}
        >
          <DialogTrigger>
            <Button>글로키 업로드하기</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>글로키 업로드하기</DialogTitle>
              <DialogDescription className="flex flex-col justify-evenly">
                <UploadForm
                  onCloseFormDialog={() => {
                    setIsUploadFormDialogOpen(false);
                  }}
                />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <div className="max-w-[1200px] grid grid-cols-3 gap-[10px]">
        {data.quleroquisDto.map((item) => (
          <GeulroquisListItem key={item.id} {...item} />
        ))}
      </div>
      <Pagination
        totalPages={Math.ceil(data.total / 9)}
        currentPage={currentPage}
        handlePaginationEvent={handlePaginationEvent}
      />
    </article>
  );
};

type GeulroquisListItemProps = GeulroquisType;

const GeulroquisListItem = ({ id, url }: GeulroquisListItemProps) => {
  const [isOpenNextGeulroquisForm, setIsOpenNextGeulroquisForm] =
    useState(false);

  const { register, handleSubmit, reset } = useForm<{ geulroquisId: number }>();

  const mutation = useMutation<AxiosResponse, Error, number>({
    mutationFn: (data: number) => putNextGeulroquis(data),
    onSuccess: () => {
      const queryKey = geulroquisQueryOptions.getGeulroquisList({
        pagination: { page: 1, perPage: 9 },
      }).queryKey;

      queryClient.invalidateQueries({ queryKey });
      reset();
      setIsOpenNextGeulroquisForm(false);
    },
    onError: (error: Error) => {
      console.error("업로드 실패:", error);
    },
  });

  const onSubmit = (data: { geulroquisId: number }) => {
    mutation.mutate(data.geulroquisId);
  };
  return (
    <Dialog
      open={isOpenNextGeulroquisForm}
      onOpenChange={setIsOpenNextGeulroquisForm}
    >
      <DialogTrigger>
        <div className="flex flex-col gap-[5px] items-center border p-[10px]">
          <img src={url} alt={`${id}번 글로키`} width={200} height={200} />
          <div>#{id}</div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>다음 글로키 지정하기</DialogTitle>
          <DialogDescription>
            <form
              className="flex flex-col justify-evenly gap-[20px]"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>{id}번 글로키의 다음 글로키를 지정해주세요.</div>
              <Input
                placeholder="다음 글로키의 번호를 입력해주세요"
                {...register("geulroquisId")}
              />
              <div className="flex gap-[20px] mt-4">
                <Button
                  type="button"
                  className="w-full"
                  variant="secondary"
                  onClick={() => {
                    setIsOpenNextGeulroquisForm(false);
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
  );
};
