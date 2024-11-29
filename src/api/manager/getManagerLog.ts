import { ResponsePaginationType, ResponseType } from "..";

import AxiosInstance from "../AxiosInstance";
import { ListParams } from "../../types/params";
import { ManagerLogType } from ".";

export type ManagerLogResponseType = {
  histories: ManagerLogType[];
} & ResponsePaginationType;

export default async function getManagerLog(params: ListParams) {
  const { page, perPage } = params.pagination;

  const filter = "all";

  const url = `/admin-office/histories?page=${page}&limit=${perPage}&filter=${filter}`;

  const response = await AxiosInstance.get<
    ResponseType<ManagerLogResponseType>
  >(url);

  return response.data.data;
}
