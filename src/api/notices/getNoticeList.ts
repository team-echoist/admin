import { ResponsePaginationType, ResponseType } from "..";

import { ListParams } from "../../types/params";
import { NoticeType } from ".";
import fetchData from "../fetchData";

export type NoticeListResponseType = {
  Notices: NoticeType[];
} & ResponsePaginationType;

export default async function getNoticeList(params: ListParams) {
  const { page, perPage } = params.pagination;
  const filter = "all";
  const url = `/admin-support/notices?page=${page}&limit=${perPage}&filter=${filter}`;

  const response = await fetchData<ResponseType<NoticeListResponseType>>({
    url,
  });
  return response.data;
}
