import { DetailParams } from "../../types/params";
import { NoticeType } from ".";
import { ResponseType } from "..";
import fetchData from "../fetchData";

export default async function getNoticeDetail(params: DetailParams) {
  const url = `/admin-support/notices/${params.id}`;

  const response = await fetchData<ResponseType<NoticeType>>({ url });
  return response.data;
}
