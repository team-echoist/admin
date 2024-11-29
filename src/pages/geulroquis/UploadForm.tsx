import { AxiosResponse } from "axios";
import { Button } from "../../components/ui/button";
import geulroquisQueryOptions from "../../queries/geulroquisQueryOptions";
import postGeulroquis from "../../api/geulroquis/postGeulroquis";
import { queryClient } from "../../App";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

type UploadFormType = { onCloseFormDialog: () => void };

type FormValues = {
  images: FileList;
};

export default function UploadForm({ onCloseFormDialog }: UploadFormType) {
  const { register, handleSubmit, reset } = useForm<FormValues>();

  const mutation = useMutation<AxiosResponse, Error, FormData>({
    mutationFn: (data: FormData) => postGeulroquis(data),
    onSuccess: () => {
      const queryKey = geulroquisQueryOptions.getGeulroquisList({
        pagination: { page: 1, perPage: 10 },
      }).queryKey;

      queryClient.invalidateQueries({ queryKey });
      reset();
      onCloseFormDialog();
    },
    onError: (error: Error) => {
      console.error("업로드 실패:", error);
    },
  });

  const onSubmit = (formData: FormValues) => {
    const data = new FormData();
    Array.from(formData.images).forEach((file) => {
      data.append("images", file);
    });

    mutation.mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-[20px]"
    >
      <div>
        <input
          type="file"
          {...register("images", { required: "이미지를 업로드해주세요." })}
          multiple
          accept="image/*"
        />
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
