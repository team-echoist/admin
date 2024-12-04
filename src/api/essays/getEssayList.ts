import { ResponsePaginationType, ResponseType } from "..";

import { EssayListType } from "./index.d";
import { ListParams } from "../../types/params";
import fetchData from "../fetchData";

export type EssayListResponseType = {
  essays: EssayListType[];
} & ResponsePaginationType;

export default async function getEssayList(params: ListParams) {
  const { page, perPage } = params.pagination;
  const keyword = params.filter?.keyword || "";

  const url = keyword
    ? `/admin-management/essays/search?page=${page}&limit=${perPage}&keyword=${keyword}`
    : `/admin-management/essays?page=${page}&limit=${perPage}`;

  const response = await fetchData<ResponseType<EssayListResponseType>>({
    url,
  });

  return response.data;
}
