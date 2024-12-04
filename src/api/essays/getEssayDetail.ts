import { DetailParams } from "../../types/params";
import { EssayType } from ".";
import { ResponseType } from "..";
import fetchData from "../fetchData";

export default async function getEssayDetail(params: DetailParams) {
  const url = `/admin-management/essays/${params.id}`;

  const response = await fetchData<ResponseType<EssayType>>({ url });
  return response.data;
}
