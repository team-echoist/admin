import { ResponsePaginationType, ResponseType } from "..";

import AxiosInstance from "../AxiosInstance";
import { GeulroquisType } from "./index.d";
import { ListParams } from "../../types/params";

export type GeulroquisResponseType = {
  quleroquisDto: GeulroquisType[];
} & ResponsePaginationType;

export default async function getGeulroquisList(params: ListParams) {
  const { page, perPage } = params.pagination;

  const url = `/admin-office/geulroquis?page=${page}&limit=${perPage}`;

  const response = await AxiosInstance.get<
    ResponseType<GeulroquisResponseType>
  >(url);

  return response.data.data;
}
