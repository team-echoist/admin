import { DetailParams } from "../../types/params";
import { ManagerType } from ".";
import { ResponseType } from "..";
import fetchData from "../fetchData";

export default async function getManager(params: DetailParams) {
  const url = `/admin-info/${params.id}`;
  const response = await fetchData<ResponseType<ManagerType>>({ url });
  return response.data;
}
