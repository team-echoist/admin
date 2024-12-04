import updateMyInfo, {
  UpdateMyInfoBodyType,
} from "../../api/auth/updateMyInfo";

import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import ItemContainer from "../../components/Detail/ItemContainer";
import { ResponseType } from "../../api";
import authQueryOptions from "../../queries/authQueryOptions";
import { omit } from "lodash-es";
import { queryClient } from "../../App";
import updateMyProfile from "../../api/auth/updateMyProfile";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

type InfoEditFormValues = {
  image: File;
} & UpdateMyInfoBodyType;

type InfoEditFormProps = { onCloseFormDialog: () => void };

export default function InfoEditForm({ onCloseFormDialog }: InfoEditFormProps) {
  const { register, handleSubmit, reset } = useForm<InfoEditFormValues>();

  const infoMutation = useMutation<
    ResponseType<unknown>,
    Error,
    UpdateMyInfoBodyType
  >({
    mutationFn: (data) => updateMyInfo(data),
    onSuccess: () => {
      const queryKey = authQueryOptions.getMyInfo().queryKey;

      queryClient.invalidateQueries({ queryKey });
      reset();
      onCloseFormDialog();
    },
    onError: (error: Error) => {
      console.error("업로드 실패:", error);
    },
  });

  const imgMutation = useMutation<ResponseType<unknown>, Error, File>({
    mutationFn: (data) => updateMyProfile(data),
  });

  const onSubmit = (formFieldData: InfoEditFormValues) => {
    imgMutation.mutate(formFieldData.image);
    infoMutation.mutate(omit(formFieldData, "image"));
  };

  return (
    <form
      className="flex flex-col gap-[20px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <ItemContainer label="이메일">
        <Input placeholder="이메일을 입력해주세요." {...register("email")} />
      </ItemContainer>
      <ItemContainer label="이름">
        <Input placeholder="이름을 입력해주세요." {...register("name")} />
      </ItemContainer>
      <ItemContainer label="한줄 메시지">
        <Input placeholder="기타 설명을 입력해주세요." {...register("info")} />
      </ItemContainer>
      <ItemContainer label="프로필 업로드">
        <Input type="file" {...register("image")} />
      </ItemContainer>
      <div className="flex gap-[20px] mt-4">
        <Button
          type="button"
          className="w-full"
          variant="secondary"
          onClick={() => {
            onCloseFormDialog();
          }}
        >
          지정 취소
        </Button>
        <Button type="submit" className="w-full">
          지정 완료
        </Button>
      </div>
    </form>
  );
}
