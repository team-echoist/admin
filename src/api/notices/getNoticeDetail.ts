import AxiosInstance from "../AxiosInstance";
import { DetailParams } from "../../types/params";
import { NoticeType } from ".";
import { ResponseType } from "..";

export default async function getNoticeDetail(params: DetailParams) {
  const url = `/admin-support/notices/${params.id}`;

  const response = await AxiosInstance.get<ResponseType<NoticeType>>(url);
  return response.data.data;
}
