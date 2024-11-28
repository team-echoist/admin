import { ResponsePaginationType, ResponseType } from "..";

import AxiosInstance from "../AxiosInstance";
import { ListParams } from "../../types/params";
import { NoticeType } from ".";

export type NoticeListResponseType = {
  Notices: NoticeType[];
} & ResponsePaginationType;

export default async function getNoticeList(params: ListParams) {
  const { page, perPage } = params.pagination;
  const filter = "all";
  const url = `/admin-support/notices?page=${page}&limit=${perPage}&filter=${filter}`;

  const response = await AxiosInstance.get<
    ResponseType<NoticeListResponseType>
  >(url);
  return response.data.data;
}
