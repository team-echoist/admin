import { ResponsePaginationType, ResponseType } from "..";

import { ListParams } from "../../types/params";
import { QueryListType } from ".";
import fetchData from "../fetchData";

export type QueryListResponseType = {
  quleroquisDto: QueryListType[];
} & ResponsePaginationType;

export default async function getQueryList(params: ListParams) {
  const { page, perPage } = params.pagination;
  const filter = "all";
  const url = `/admin-support/notices?page=${page}&limit=${perPage}&filter=${filter}`;

  const response = await fetchData<ResponseType<QueryListResponseType>>({
    url,
  });
  return response.data;
}