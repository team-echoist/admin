import fetchData from "../fetchData";
import { z } from "zod";

export const PostQueryAnswerSchema = z.object({
  answer: z
    .string()
    .min(10, { message: "10글자 이상의 답변변을 입력해주세요." }),
});

export type PostQueryAnswerBodyType = z.infer<typeof PostQueryAnswerSchema>;

export default async function postQueryAnswer(
  id: number,
  body: PostQueryAnswerBodyType
) {
  const url = `/admin-support/inquiries/${id}`;

  const response = await fetchData({ url, method: "POST", body });

  return response;
}
