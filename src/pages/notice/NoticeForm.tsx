import { Controller, useForm } from "react-hook-form";
import { Suspense, lazy } from "react";
import postNotice, {
  PostNoticeBodyType,
  PostNoticeSchema,
} from "../../api/notices/postNotice";

import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import ItemContainer from "../../components/Detail/ItemContainer";
import LoadingFallback from "../../components/fallback/LoadingFallback";
import noticeQueryOptions from "../../queries/noticeQueryOptions";
import { queryClient } from "../../App";
import { zodResolver } from "@hookform/resolvers/zod";

const ReactQuill = lazy(() => import("react-quill-new"));

type NoticeFormType = { onCloseNoticeFormDialog: () => void };
export default function NoticeForm({
  onCloseNoticeFormDialog,
}: NoticeFormType) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<PostNoticeBodyType>({
    resolver: zodResolver(PostNoticeSchema),
  });

  const onClickSubmitNotice = async (data: PostNoticeBodyType) => {
    try {
      await postNotice(data);
      const queryKey = noticeQueryOptions.getNoticeList({
        pagination: { page: 1, perPage: 10 },
      }).queryKey;
      reset();
      onCloseNoticeFormDialog();
      queryClient.resetQueries({ queryKey });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onClickSubmitNotice)}
      className="flex flex-col gap-[20px]"
    >
      <div>
        <ItemContainer
          label="제목"
          className="flex-row items-center gap-[10px]"
        >
          <Input
            placeholder="공지사항의 제목을 입력해주세요"
            {...register("title")}
          />
        </ItemContainer>
        {errors.title && (
          <span className="text-red-500">{errors.title.message}</span>
        )}
      </div>
      <ItemContainer label="내용" className="h-[500px]">
        <Suspense fallback={<LoadingFallback />}>
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <ReactQuill
                {...field}
                className="mt-[20px] h-[430px]"
                placeholder="공지사항의 내용을 입력해주세요"
                theme="snow"
                onChange={(value) => field.onChange(value)}
              />
            )}
          />
          {errors.content && (
            <span className="text-red-500">{errors.content.message}</span>
          )}
        </Suspense>
      </ItemContainer>
      <div className="flex gap-[20px]">
        <Button
          type="button"
          className="w-full"
          variant="secondary"
          onClick={onCloseNoticeFormDialog}
        >
          작성 취소
        </Button>
        <Button type="submit" className="w-full">
          작성 완료
        </Button>
      </div>
    </form>
  );
}
