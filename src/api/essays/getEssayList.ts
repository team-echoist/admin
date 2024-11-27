import AxiosInstance from "../AxiosInstance";
import { EssayListType } from "./index.d";
import { ListParams } from "../../types/params";

export default async function getEssayList(params: ListParams) {
  const { page, perPage } = params.pagination;

  const filter = "all";

  const url = `/admin-management/essays?page=${page}&limit=${perPage}&filter=${filter}`;

  const response = await AxiosInstance.get<{
    data: {
      essays: EssayListType[];
      total: number;
      page: number;
      totalPage: number;
    };
  }>(url);

  return response;
}
