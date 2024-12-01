import { ResponsePaginationType, ResponseType } from "..";

import AxiosInstance from "../AxiosInstance";
import { EssayListType } from "./index.d";
import { ListParams } from "../../types/params";

export type EssayListResponseType = {
  essays: EssayListType[];
} & ResponsePaginationType;

export default async function getEssayList(params: ListParams) {
  const { page, perPage } = params.pagination;
  const keyword = params.filter?.keyword || "";

  const url = keyword
    ? `/admin-management/essays/search?page=${page}&limit=${perPage}&keyword=${keyword}`
    : `/admin-management/essays?page=${page}&limit=${perPage}`;

  const response = await AxiosInstance.get<ResponseType<EssayListResponseType>>(
    url
  );

  return response.data;
}
