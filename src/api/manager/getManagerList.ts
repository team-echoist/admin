import { ResponsePaginationType, ResponseType } from "..";

import { ListParams } from "../../types/params";
import { ManagerListType } from "./index.d";
import fetchData from "../fetchData";

export type ManagerListResponseType = {
  admins: ManagerListType[];
} & ResponsePaginationType;

export default async function getManagerList(params: ListParams) {
  const { page, perPage } = params.pagination;

  const filter = "all";

  const url = `/admin-info?page=${page}&limit=${perPage}&filter=${filter}`;

  const response = await fetchData<ResponseType<ManagerListResponseType>>({
    url,
  });

  return response.data;
}
