import { ResponsePaginationType, ResponseType } from "..";

import { GeulroquisType } from "./index.d";
import { ListParams } from "../../types/params";
import fetchData from "../fetchData";

export type GeulroquisResponseType = {
  quleroquisDto: GeulroquisType[];
} & ResponsePaginationType;

export default async function getGeulroquisList(params: ListParams) {
  const { page, perPage } = params.pagination;

  const url = `/admin-office/geulroquis?page=${page}&limit=${perPage}`;

  const response = await fetchData<ResponseType<GeulroquisResponseType>>({
    url,
  });

  return response.data;
}
