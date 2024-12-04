import { ResponsePaginationType, ResponseType } from "..";

import { ListParams } from "../../types/params";
import { ManagerLogType } from ".";
import fetchData from "../fetchData";

export type ManagerLogResponseType = {
  histories: ManagerLogType[];
} & ResponsePaginationType;

export default async function getManagerLog(params: ListParams) {
  const { page, perPage } = params.pagination;

  const filter = "all";

  const url = `/admin-office/histories?page=${page}&limit=${perPage}&filter=${filter}`;

  const response = await fetchData<ResponseType<ManagerLogResponseType>>({
    url,
  });

  return response.data;
}
