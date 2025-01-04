import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";
import postQueryAnswer from "../../api/query/postQueryAnswer";
import useLocationId from "../../hooks/useLocationId";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export default function QueryAnswerForm() {
  const id = useLocationId();
  const [answerContent, setAnserContent] = useState("");
  const mutation = useMutation({
    mutationFn: () => postQueryAnswer(id, { answer: answerContent }),
    onSuccess: () => {
      console.log("답변 완료");
    },
    onError: (error: Error) => {
      console.error("업로드 실패:", error);
    },
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutation.mutate();
  };

  return (
    <form className="flex flex-col gap-[20px]" onSubmit={onSubmit}>
      <label>문의사항 답변 내용</label>
      <Textarea
        value={answerContent}
        onChange={(e) => {
          setAnserContent(e.target.value);
        }}
      />
      <Button type="submit">답변 완료</Button>
    </form>
  );
}
