import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";

import { Button } from "../../components/ui/button";
import { DefaultPaths } from "../../router/paths";
import deleteUser from "../../api/user/deleteUser";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

type DeleteDialogProps = {
  id: number;
  email: string;
};

export default function DeleteDialog({ id, email }: DeleteDialogProps) {
  const navigate = useNavigate();
  const deleteMutation = useMutation({
    mutationFn: () => deleteUser(id),

    onSuccess: () => {
      navigate(`/${DefaultPaths.USER.LIST}`);
    },
    onError: () => {
      alert("계정 삭제는 root 계정만 가능합니다.");
    },
  });

  const onClickDeleteUser = () => {
    deleteMutation.mutate();
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>해당 유저를 삭제하시겠습니까?</DialogTitle>
        <DialogDescription className="flex flex-col gap-[20px] justify-center">
          <div>한번 삭제한 유저는 되돌릴 수 없습니다.</div>
          <div>
            <label>사용자 계정 아이디</label>
            <div>{id}</div>
          </div>
          <div>
            <label>사용자 계정 이메일</label>
            <div>{email}</div>
          </div>
          <Button variant="destructive" onClick={onClickDeleteUser}>
            삭제하기
          </Button>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  );
}
