import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { useMutation, useQuery } from "@tanstack/react-query";

import APIErrorProvider from "../../components/fallback/APIErrorProvider";
import APILoadingProvider from "../../components/fallback/APILoadingProvider";
import { AxiosResponse } from "axios";
import Blank from "../../components/fallback/Blank";
import { Button } from "../../components/ui/button";
import ErrorFallback from "../../components/fallback/ErrorFallback";
import { GeulroquisType } from "../../api/geulroquis";
import { Input } from "../../components/ui/input";
import LoadingFallback from "../../components/fallback/LoadingFallback";
import Pagination from "../../components/Pagination";
import UIErrorBoundary from "../../components/fallback/UIErrorBoundary";
import UploadForm from "./UploadForm";
import geulroquisQueryOptions from "../../queries/geulroquisQueryOptions";
import putNextGeulroquis from "../../api/geulroquis/putNextGeulroquis";
import { queryClient } from "../../App";
import { useForm } from "react-hook-form";
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
  const [isUploadFormDialogOpen, setIsUploadFormDialogOpen] = useState(false);
  const { currentPage, handlePaginationEvent } = usePagination();
  const {
    data: listData,
    error: listError,
    isLoading: isListLoading,
  } = useQuery({
    ...geulroquisQueryOptions.getGeulroquisList({
      pagination: { page: currentPage, perPage: 9 },
    }),
  });

  const {
    data: countData,
    error: countError,
    isLoading: isCountLoading,
  } = useQuery({
    ...geulroquisQueryOptions.getGeulroquisCount(),
  });

  if (isListLoading || isCountLoading) {
    return <LoadingFallback />;
  }
  if (listError instanceof Error || countError instanceof Error) {
    return <ErrorFallback />;
  }

  if (!listData || !countData) {
    return <Blank />;
  }

  return (
    <article className="flex flex-col items-center gap-[20px]">
      <div className="w-full flex justify-between">
        <div>
          총 글로키 수 {countData.total} / 이용가능 글로키수{" "}
          {countData.available}
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
        {listData.quleroquisDto.map((item) => (
          <GeulroquisListItem key={item.id} {...item} />
        ))}
      </div>
      <Pagination
        totalPages={Math.ceil(listData.total / 9)}
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
