import { DetailParams } from "../../types/params";
import { QueryType } from ".";
import { ResponseType } from "..";
import fetchData from "../fetchData";

export default async function getQueryDetail(params: DetailParams) {
  const url = `/admin-support/queries/${params.id}`;

  const response = await fetchData<ResponseType<QueryType>>({ url });
  return response.data;
}
