import fetchData from "../fetchData";
import { z } from "zod";

export const PostNoticeSchema = z.object({
  title: z.string().min(5, { message: "5글자 이상의 제목을 입력해주세요." }),
  content: z
    .string()
    .min(10, { message: "최소 10자 이상의 내용을 입력해주세요." }),
});

export type PostNoticeBodyType = z.infer<typeof PostNoticeSchema>;

export default async function postNotice(body: PostNoticeBodyType) {
  const url = `/admin-support/notices`;

  const response = await fetchData({ url, method: "POST", body });

  return response;
}
