import { UseFormRegisterReturn, useForm } from "react-hook-form";
import postTheme, { ThemePostBody } from "../../api/theme/postTheme";

import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { ResponseType } from "../../api";
import { queryClient } from "../../App";
import themeQueryOptions from "../../queries/themeQueryOptions";
import { useMutation } from "@tanstack/react-query";

type UploadFormProps = { onCloseFormDialog: () => void };

export default function UploadForm({ onCloseFormDialog }: UploadFormProps) {
  const { register, handleSubmit, reset } = useForm<ThemePostBody>();

  const mutation = useMutation<ResponseType<unknown>, Error, ThemePostBody>({
    mutationFn: (data: ThemePostBody) => postTheme(data),
    onSuccess: () => {
      const queryKey = themeQueryOptions.getThemeList().queryKey;

      queryClient.invalidateQueries({ queryKey });
      reset();
      onCloseFormDialog();
    },
    onError: (error: Error) => {
      console.error("업로드 실패:", error);
    },
  });

  const onSubmit = (data: ThemePostBody) => {
    mutation.mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-[20px]"
    >
      <div>
        <div className="flex flex-col gap-[10px]">
          <UploadFormItem label="테마 이름" register={register("name")} />
          <UploadFormItem label="테마 가격" register={register("price")} />
          <UploadFormItem label="테마 URL" register={register("url")} />
        </div>
        <div className="flex gap-[20px] mt-4">
          <Button
            type="button"
            className="w-full"
            variant="secondary"
            onClick={onCloseFormDialog}
            disabled={mutation.isPending}
          >
            작성 취소
          </Button>
          <Button
            type="submit"
            className="w-full"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "업로드 중..." : "작성 완료"}
          </Button>
        </div>
      </div>
    </form>
  );
}

type UploadFormItemProps = {
  label: string;
  register: UseFormRegisterReturn;
};
function UploadFormItem({ label, register }: UploadFormItemProps) {
  return (
    <div className="flex items-center gap-[20px]">
      <Label className="flex-shrink-0">{label}</Label>
      <Input {...register} />
    </div>
  );
}
